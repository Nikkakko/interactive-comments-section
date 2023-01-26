import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import IconMinus from '../styles/IconMinus';
import IconPlus from '../styles/IconPlus';
import { ReplyIcon } from '../styles/ReplyIcon';
import EditDelete from './EditDelete';
import AddReply from './Reply';

export interface RProps {
  handleReply?: any;
  revealReply?: undefined | Array<number>;
  replies?: any;
  voteHandler?: any;
  commentId?: string | number;
  replieId?: string | number;
}

type reply = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number | string;
    username: string;
    image: {
      png: string;
    };
  };
  score: number;
  replies: [];
};

const Replies = ({
  handleReply,
  revealReply,
  replies,
  voteHandler,
}: RProps) => {
  const { currentUser, isEditing } = useAppSelector(state => state.comments);

  return (
    <>
      {replies?.map((reply: reply, index: number) => (
        <div key={reply.id} style={{ marginTop: '16px' }}>
          <Container key={reply.id}>
            <Wrapper>
              <HeaderWrapper>
                <Image src={reply?.user?.image?.png} alt='' />
                {currentUser.username === reply?.user?.username && (
                  <User>you</User>
                )}

                <Username>{reply?.user?.username}</Username>
                <CreatedDate>{reply?.createdAt}</CreatedDate>
              </HeaderWrapper>
              <ContentWrapper>
                <ContentText>{reply?.content}</ContentText>
              </ContentWrapper>
              <FooterWrapper>
                <Increment>
                  <PlustButton onClick={() => voteHandler(reply?.id, 'plus')}>
                    <IconPlus />
                  </PlustButton>
                  <Score>{reply?.score}</Score>
                  <MinusButton onClick={() => voteHandler(reply?.id, 'minus')}>
                    <IconMinus />
                  </MinusButton>
                </Increment>

                {currentUser.username === reply?.user?.username ? (
                  <EditDelete replyId={reply?.id} handleReply={handleReply} />
                ) : (
                  <Reply onClick={() => handleReply(Number(reply?.id))}>
                    <ReplyIcon />
                    <ReplyText>Reply</ReplyText>
                  </Reply>
                )}
              </FooterWrapper>
            </Wrapper>
          </Container>

          {/* {revealReply.includes(reply.id) && (
            <AddReply replieId={reply.id} handleReply={handleReply} />
          )} */}

          {isEditing && revealReply?.includes(reply?.id) ? (
            <AddReply replieId={reply?.id} handleReply={handleReply} />
          ) : (
            revealReply?.includes(reply?.id) && (
              <AddReply replieId={reply.id} handleReply={handleReply} />
            )
          )}
        </div>
      ))}
    </>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  width: 325px;
  margin-left: 16px;
  /* height: 256px; */
  /* margin-top: 16px; */
  gap: 16px;

  display: flex;
  flex-direction: column;
`;

const User = styled.p`
  background: ${({ theme }) => theme.colors.moderateBlue};
  border-radius: 2px;
  padding: 2px 4px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.small};
  font-size: 12px;
`;

const ReplyContainer = styled.div`
  border: 1px solid blue;
`;

const Wrapper = styled.div`
  padding: 16px 16px 24px 16px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const ContentWrapper = styled.div``;

const ContentText = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.grayishBlue};
  font-weight: ${({ theme }) => theme.fontWeight.small};

  span {
    color: ${({ theme }) => theme.colors.moderateBlue};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;
const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
`;
const Username = styled.p`
  color: ${({ theme }) => theme.colors.darkBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
const CreatedDate = styled.p`
  color: ${({ theme }) => theme.colors.grayishBlue};
  font-weight: ${({ theme }) => theme.fontWeight.small};
`;

const Increment = styled.div`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.veryLightGray};
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Reply = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
`;

const ReplyText = styled.p`
  color: ${({ theme }) => theme.colors.moderateBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.lightBlue};
  }

  /* cursor: pointer; */
`;

const Score = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.moderateBlue};
`;
const PlustButton = styled.button`
  border: none;
  outline: none;
  display: flex;

  cursor: pointer;
`;
const MinusButton = styled(PlustButton)``;
export default Replies;
