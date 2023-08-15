import React from 'react';

import { useInfiniteReplies } from '@hooks/tanstack-query/station-details/reviews/useInfiniteReplies';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import ReplyCard from '@ui/StationDetailsWindow/reviews/replies/ReplyCard';
import ReplyListLoading from '@ui/StationDetailsWindow/reviews/replies/ReplyListLoading';

interface ReplyListProps {
  stationId: string;
  reviewId: number;
}

const ReplyList = ({ stationId, reviewId }: ReplyListProps) => {
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteReplies(reviewId);

  return (
    <>
      {status === 'loading' ? (
        <ReplyListLoading count={5} />
      ) : status === 'error' ? (
        <Text variant="caption" align="center">
          Error: {JSON.stringify(error)}
        </Text>
      ) : (
        <>
          {data.pages.map((page) => (
            <div key={page.nextPage}>
              {page.replies.length === 0 && (
                <Text m={10} align="center">
                  등록 된 답글이 없습니다.
                </Text>
              )}
              {page.replies.map((reply, index) => (
                <ReplyCard key={index} stationId={stationId} reply={reply} previewMode={true} />
              ))}
            </div>
          ))}
          {isFetchingNextPage && <ReplyListLoading count={5} />}
          <Box pl={8} pr={4} my={3}>
            <ButtonNext
              size="xs"
              py={2}
              color="secondary"
              variant="contained"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              fullWidth
            >
              {isFetchingNextPage
                ? '로딩중...'
                : hasNextPage
                ? '답글 더 보기'
                : '더 이상 답글이 없습니다.'}
            </ButtonNext>
          </Box>
        </>
      )}
    </>
  );
};

export default ReplyList;
