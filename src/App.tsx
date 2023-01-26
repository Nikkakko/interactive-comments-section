import Card from './components/Card';
import styled from 'styled-components';
import { useEffect } from 'react';
import { getApi } from './features/getApi';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Replies from './components/Replies';
import AddComment from './components/AddComment';
import Loading from './components/Loading';
import Reply from './components/Reply';

const App = () => {
  const dispatch = useAppDispatch();
  const { comments, isLoading } = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(getApi());
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <AppContainer>
      <Card />
      <AddComment />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 32px 16px 32px 16px;

  gap: 16px;

  @media (min-width: 1440px) {
  }
`;

export default App;
