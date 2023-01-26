import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addReplyToContent, setContent } from '../features/commentSlice';

import ReplyButton from './ReplyButton';
import { RProps } from './Replies';

// props extends RProps

interface Props extends RProps {
  commentId: number;
  replieId?: number;
}

const Reply = ({ commentId, handleReply, replieId }: RProps) => {
  const { currentUser, comments, isEditing, content } = useAppSelector(
    state => state.comments
  );
  const dispatch = useAppDispatch();
  const [replyTo, setReplyTo] = useState<string>(`@${findUser()}`);
  console.log(content);
  const [createdAt, setCreatedAt] = useState(0);

  function findUser() {
    const user = comments.find(comment => comment.id === commentId);
    const userName = user?.user.username;

    const userReplies = comments.map(comment => {
      return comment.replies.find((reply: any) => reply.id === replieId);
    });

    const userReplyName = userReplies.map((reply: any) => reply?.user.username);

    return replieId ? userReplyName : userName;
  }

  useEffect(() => {
    setCreatedAt(Date.now());
  }, []);

  const addReplyComment = () => {
    const ID = replieId ? replieId : commentId;

    if (content === '') return;

    const newReply = {
      id: Math.floor(Math.random() * 1000),
      content: content,
      createdAt: moment(createdAt).startOf('minutes').fromNow(),
      score: 0,
      replyingTo: findUser(),
      user: {
        image: {
          png: currentUser.image.png,
        },
        username: currentUser.username,
      },

      replies: [],
    };

    dispatch(setContent(''));

    handleReply(ID);
    dispatch(addReplyToContent({ commentId: ID, reply: newReply }));
  };

  return (
    <Container>
      <Wrapper>
        <Image src={currentUser.image.png} alt='' />
        <TextArea
          placeholder='Add a reply...'
          value={content}
          onChange={e => dispatch(setContent(e.target.value))}
        />
        <ReplyButton
          addReplyComment={addReplyComment}
          commentId={commentId}
          replieId={replieId}
          handleReply={handleReply}
          content={content}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  width: 343px;
  /* height: 112px; */
  position: relative;

  /* display: flex; */
`;

const Wrapper = styled.div`
  padding: 12px;
  display: flex;
  justify-content: space-evenly;

  gap: 4px;
`;

const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.moderateBlue};
  resize: none;
  width: 100%;
  height: 69px;
  border-radius: 8px;

  font-family: 'Rubik', sans-serif;
  padding: 4px;
  color: ${({ theme }) => theme.colors.grayishBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayishBlue};
    font-weight: ${({ theme }) => theme.fontWeight.small};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
`;
export default Reply;
