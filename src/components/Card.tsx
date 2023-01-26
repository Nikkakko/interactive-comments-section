import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ReplyIcon } from '../styles/ReplyIcon';
import IconPlus from '../styles/IconPlus';
import IconMinus from '../styles/IconMinus';
import Replies from './Replies';
import AddReply from './Reply';
import EditDelete from './EditDelete';
import { vote } from '../features/commentSlice';
import { useState } from 'react';

interface VoteType {
  prev: string;
  curr: string;
  id: number | string | null;
}

const Card = () => {
  const dispatch = useAppDispatch();
  const { comments, currentUser, isEditing, content, defScore } =
    useAppSelector(state => state.comments);

  const [voteType, setVoteType] = useState<VoteType>({
    prev: '',
    curr: 'default',
    id: null,
  });

  const [revealReply, setRevealReply] = useState<Array<number>>([]);

  const handleReply = (id: number) => {
    if (revealReply.includes(id)) {
      setRevealReply(revealReply.filter((item: number) => item !== id));
    } else {
      setRevealReply([...revealReply, id]);
    }
  };

  function voteHandler(id: number | string, type: string) {
    if (
      voteType.curr === type &&
      voteType.prev === 'default' &&
      id === voteType.id
    ) {
      return;
    }

    if (voteType.curr !== type && voteType.prev === 'default') {
      dispatch(vote({ id, type }));
      setVoteType({ prev: voteType.curr, curr: type, id: id });
    } else {
      dispatch(vote({ id, type }));
      setVoteType({ prev: 'default', curr: type, id: id });
    }
  }

  return (
    <>
      {comments?.map((comment, index) => (
        <div key={comment.id}>
          <Container>
            <Wrapper>
              <HeaderWrapper>
                <Image src={comment?.user?.image.png} alt='' />
                {currentUser.username === comment?.user?.username && (
                  <User>you</User>
                )}
                <Username>{comment?.user?.username}</Username>
                <CreatedDate>{comment?.createdAt}</CreatedDate>
              </HeaderWrapper>
              <ContentWrapper>
                <ContentText>{comment?.content}</ContentText>
              </ContentWrapper>
              <FooterWrapper>
                <Increment>
                  <PlustButton onClick={() => voteHandler(comment.id, 'plus')}>
                    <IconPlus />
                  </PlustButton>
                  <Score>{comment?.score}</Score>
                  <MinusButton onClick={() => voteHandler(comment.id, 'minus')}>
                    <IconMinus />
                  </MinusButton>
                </Increment>

                {currentUser.username === comment?.user?.username ? (
                  <EditDelete
                    commentId={comment?.id as number}
                    handleReply={handleReply as any}
                  />
                ) : (
                  <Reply onClick={() => handleReply(Number(comment.id))}>
                    <ReplyIcon />
                    <ReplyText>Reply</ReplyText>
                  </Reply>
                )}
              </FooterWrapper>
            </Wrapper>
          </Container>

          {isEditing && revealReply.includes(comment?.id as number) ? (
            <AddReply commentId={comment?.id} handleReply={handleReply} />
          ) : (
            revealReply.includes(comment?.id as number) && (
              <AddReply commentId={comment?.id} handleReply={handleReply} />
            )
          )}

          {comment?.replies?.length > 0 && (
            <Replies
              replies={comment?.replies}
              handleReply={handleReply}
              revealReply={revealReply}
              voteHandler={voteHandler as any}
            />
          )}
        </div>
      ))}
    </>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  width: 343px;
  /* height: 256px; */

  display: flex;
  flex-direction: column;

  @media (min-width: 1440px) {
  }
`;

const User = styled.p`
  background: ${({ theme }) => theme.colors.moderateBlue};
  border-radius: 2px;
  padding: 2px 4px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.small};
  font-size: 12px;
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

export default Card;
