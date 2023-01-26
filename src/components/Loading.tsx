import styled from 'styled-components';

const Loading = () => {
  return <LoadingContainer></LoadingContainer>;
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  // create spinner
  &::after {
    content: '';
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.colors.lightBlue};
    border-color: ${({ theme }) => theme.colors.lightBlue} transparent
      ${({ theme }) => theme.colors.lightBlue} transparent;
    animation: spinner 1.2s linear infinite;

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export default Loading;
