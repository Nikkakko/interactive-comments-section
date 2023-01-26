import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  findContent,
  setIsEditing,
  setIsOpen,
} from '../features/commentSlice';
import IconDelete from '../styles/IconDelete';
import IconEdit from '../styles/IconEdit';
import Modal from './Modal';

type Props = {
  replyId?: number;
  commentId?: number;
  handleReply: (id: undefined | number) => void;
};

const EditDelete = ({ replyId, commentId, handleReply }: Props) => {
  const { isOpen } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (replyId) {
      dispatch(deleteComment({ replyId }));
    } else {
      dispatch(deleteComment({ commentId }));
    }

    dispatch(setIsOpen());
  };

  const handleEdit = () => {
    dispatch(findContent({ replyId, commentId }));
    dispatch(setIsEditing());
  };

  const handleModal = () => {
    dispatch(setIsOpen());
  };

  return (
    <Container>
      {isOpen && <Modal handleDelete={handleDelete} />}
      <Delete onClick={() => handleModal()}>
        <IconDelete />
        Delete
      </Delete>
      <Edit
        onClick={() => {
          handleReply(replyId ? replyId : commentId);
          handleEdit();
        }}
      >
        <IconEdit />
        Edit
      </Edit>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 16px;
`;

const Delete = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({ theme }) => theme.colors.softRed};

  &:hover {
    color: ${({ theme }) => theme.colors.paleRed};
  }

  font-weight: ${({ theme }) => theme.fontWeight.medium};

  cursor: pointer;
`;

const Edit = styled(Delete)`
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({ theme }) => theme.colors.moderateBlue};

  &:hover {
    color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

export default EditDelete;
