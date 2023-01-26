import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { editComment } from '../features/commentSlice';

const ReplyButton = ({
  addReplyComment,
  handleReply,
  commentId,
  replieId,
  content,
}: any) => {
  const { isEditing } = useAppSelector(state => state.comments);

  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => {
        isEditing
          ? dispatch(editComment({ commentId, replieId, content })) &&
            handleReply(replieId ? replieId : commentId)
          : addReplyComment();
      }}
    >
      {isEditing ? 'Update' : 'Reply'}
    </Button>
  );
};

const Button = styled.button`
  background: ${({ theme }) => theme.colors.moderateBlue};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.small};
  border: none;
  border-radius: 8px;
  height: 32px;

  padding: 8px 6px;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.lightBlue};
  }
`;

export default ReplyButton;
