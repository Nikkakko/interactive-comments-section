import styled from 'styled-components';

const iconDelete = () => {
  return (
    <Icon width='12' height='14' xmlns='http://www.w3.org/2000/svg'>
      <IconPath d='M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z' />
    </Icon>
  );
};

const Icon = styled.svg`
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.softRed};

  &:hover {
    fill: ${({ theme }) => theme.colors.paleRed};
  }
`;
const IconPath = styled.path``;

export default iconDelete;