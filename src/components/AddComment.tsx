import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addNewComment,
  setContent,
  setIsEditing,
} from '../features/commentSlice';
import moment from 'moment';

const AddComment = () => {
  const dispatch = useAppDispatch();
  // const { content } = useAppSelector(state => state.comments);
  const [content, setContent] = useState<string>('');

  const [createdAt, setCreatedAt] = useState<number>(0);

  useEffect(() => {
    setCreatedAt(Date.now());
  }, []);

  const { currentUser, comments } = useAppSelector(state => state.comments);

  const handleComment = () => {
    const newComment = {
      id: Math.floor(Math.random() * 1000),
      content: content,
      score: 0,
      createdAt: moment(createdAt).startOf('minutes').fromNow(),
      user: {
        image: {
          png: currentUser.image?.png,
        },
        username: currentUser.username,
      },

      replies: [],
    };

    setContent('');

    dispatch(addNewComment(newComment));
  };

  return (
    <Container>
      <Wrapper>
        <TextArea
          placeholder='Add a comment...'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Info>
          <Image src={currentUser.image?.png} />
          <SendButton onClick={handleComment}>Send</SendButton>
        </Info>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  width: 343px;
  /* height: 256px; */

  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 16px;
`;

const TextArea = styled.textarea`
  padding: 16px 0px 60px 24px;
  width: 311px;

  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  resize: none;
  font-family: 'Rubik', sans-serif;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayishBlue};
    font-weight: ${({ theme }) => theme.fontWeight.small};
    font-family: 'Rubik', sans-serif;
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`;
const Image = styled.img`
  width: 32px;
  height: 32px;
`;
const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.moderateBlue};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.large};

  padding: 12px 30px;

  border: none;
  border-radius: 8px;

  text-transform: uppercase;

  cursor: pointer;
`;

export default AddComment;
