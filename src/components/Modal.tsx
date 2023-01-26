import styled from 'styled-components';
import react from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteComment, setIsOpen } from '../features/commentSlice';

type BProps = {
  bg?: string;
};

type Props = {
  handleDelete: () => void;
};

const Modal = ({ handleDelete }: Props) => {
  const { isOpen } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Container>
        <Wrapper>
          <Title>Delete Comment</Title>
          <SubTitle>
            Are you sure you want to delete this comment? This will remove the
            comment and can’t be undone.
          </SubTitle>

          <Buttons>
            <Button
              onClick={() => {
                dispatch(setIsOpen());
              }}
              bg='red'
            >
              No, Cancel
            </Button>
            <Button onClick={() => handleDelete()}>Yes, Delete</Button>
          </Buttons>
        </Wrapper>
      </Container>
    </>,
    document.getElementById('portal')!
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  width: 325px;
  height: 200px;
  display: flex;
  flex-direction: column;

  padding: 16px 16px 24px 16px;
  gap: 20px;
`;

const Button = styled.button<BProps>`
  width: 112px;
  height: 40px;
  border-radius: 8px;
  border: none;
  /* font-size: 16px; */
  background: ${({ theme, bg }) =>
    bg !== 'red' ? theme.colors.softRed : theme.colors.grayishBlue};
  font-weight: ${({ theme }) => theme.fontWeight.large};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  line-height: 24px;
  text-transform: uppercase;

  &:hover {
    background: ${({ theme, bg }) =>
      bg !== 'red' ? theme.colors.paleRed : theme.colors.darkBlue};
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.darkBlue};
`;
const SubTitle = styled.p`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.small};
  color: ${({ theme }) => theme.colors.grayishBlue};
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Modal;
