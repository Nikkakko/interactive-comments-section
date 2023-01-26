import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { getApi } from './getApi';
import { TComments, TUser } from '../types/data';

// Define a type for the slice state
interface CommentState {
  currentUser: TUser[] | any;
  comments: TComments[];
  content: string | any;
  defScore: number | any;
  isLoading: boolean;
  isOpen: boolean;
  error: string | undefined | null;
  record?: any;
  isEditing: boolean;
}

// Define the initial state using that type
const initialState: CommentState = {
  currentUser: [],
  comments: [],
  content: '',
  isEditing: false,
  isOpen: false,
  defScore: 0,
  isLoading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<any>) => {
      state.comments = [...state.comments, action.payload];
    },

    addReplyToContent: (state, action: PayloadAction<any>) => {
      const { commentId, reply } = action.payload;
      // add reply to state.comments.replies array
      state.comments = state.comments.map(comment => {
        if (
          comment.id === commentId ||
          comment.replies.some((reply: any) => reply.id === commentId)
        ) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          };
        }

        return comment;
      });
    },

    deleteComment: (state, action: PayloadAction<any>) => {
      const { commentId, replyId } = action.payload;
      // delete comment from state.comments array
      const comments = state.comments.filter(
        comment => comment.id !== commentId
      );

      const replies = comments.map(comment => {
        return {
          ...comment,
          replies: comment.replies.filter((reply: any) => reply.id !== replyId),
        };
      });

      if (commentId) {
        state.comments = comments;
      } else if (replyId) {
        state.comments = replies;
      }
    },

    setIsEditing: state => {
      state.isEditing = !state.isEditing;
    },

    editComment: (state, action: PayloadAction<any>) => {
      const { commentId, replieId, content } = action.payload;

      const commentsContent = state.comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content,
          };
        }

        return comment;
      });

      const repliesContent = state.comments.map(comment => {
        return {
          ...comment,
          replies: comment.replies.map((reply: any) => {
            if (reply.id === replieId) {
              return {
                ...reply,
                content,
              };
            }

            return reply;
          }),
        };
      });

      if (commentId) {
        state.comments = commentsContent;
        state.isEditing = false;
      } else if (replieId) {
        state.comments = repliesContent;
        state.isEditing = false;
      }
    },

    setContent: (state, action: PayloadAction<any>) => {
      // set content to state.content and remove array
      state.content = action.payload;
    },

    findContent: (state, action: PayloadAction<any>) => {
      const { commentId, replyId } = action.payload;

      const commentsContent = state.comments.map(comment => {
        if (comment.id === commentId) {
          return comment.content;
        }
      });

      const repliesContent = state.comments.map(comment => {
        const replies = comment.replies.map((reply: any) => {
          if (reply.id === replyId) {
            return reply.content;
          }
        });
        return replies;
      });

      if (commentId) {
        state.content = commentsContent
          .flat(1)
          .filter(item => item !== undefined);
      } else if (replyId) {
        state.content = repliesContent
          .flat(1)
          .filter(item => item !== undefined);
      }
    },

    setIsOpen: state => {
      state.isOpen = !state.isOpen;
    },

    vote: (state, action: PayloadAction<any>) => {
      const { id, type } = action.payload;
      const sorter = (arr: any) => {
        return arr.sort((a: any, b: any) => b.score - a.score);
      };

      const voted = state.comments.map((x: any) => {
        if (x.id === id) {
          if (type === 'plus') return { ...x, score: x.score + 1 };
          if (type === 'minus' && x.score !== 0)
            return { ...x, score: x.score - 1 };
        }
        return {
          ...x,
          replies: x.replies.map((x: any) => {
            if (x.id === id) {
              if (type === 'plus') return { ...x, score: x.score + 1 };
              if (type === 'minus' && x.score !== 0)
                return { ...x, score: x.score - 1 };
            }
            return x;
          }),
        };
      });

      state.comments = sorter(voted);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getApi.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getApi.fulfilled,
        (state, action: PayloadAction<CommentState>) => {
          state.isLoading = false;
          state.currentUser = action.payload.record.currentUser;
          state.comments = action.payload.record.comments;
        }
      );

    builder.addCase(getApi.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  addNewComment,
  addReplyToContent,
  deleteComment,
  setIsEditing,
  editComment,
  setContent,
  findContent,
  setIsOpen,
  vote,
} = commentSlice.actions;

export default commentSlice.reducer;
