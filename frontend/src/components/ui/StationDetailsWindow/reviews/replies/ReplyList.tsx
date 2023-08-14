import React from 'react';

import { useInfiniteReplies } from '@hooks/tanstack-query/station-details/reviews/useInfiniteReplies';

import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import ReplyCard from '@ui/StationDetailsWindow/reviews/replies/ReplyCard';
import ReplyListLoading from '@ui/StationDetailsWindow/reviews/replies/ReplyListLoading';

import type { Reply } from '@type';

interface ReplyListProps {
  reviewId: number;
}

const ReplyList = ({ reviewId }: ReplyListProps) => {
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteReplies(reviewId);

  return (
    <>
      {status === 'loading' ? (
        <ReplyListLoading count={10} />
      ) : status === 'error' ? (
        <Text variant="caption" align="center">
          Error: {JSON.stringify(error)}
        </Text>
      ) : (
        <>
          {data.pages.map((page) => (
            <div key={page.currentPage}>
              {page.replies.length === 0 && (
                <Text m={10} align="center">
                  등록 된 답글이 없습니다.
                </Text>
              )}
              {(page.replies as Reply[]).map((reply, index) => (
                <ReplyCard
                  key={index}
                  stationId=""
                  reply={reply}
                  reviewId={reply.reviewId}
                  previewMode={false}
                />
              ))}
            </div>
          ))}
          {isFetchingNextPage && <ReplyListLoading count={5} />}
          <ButtonNext
            size="xs"
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
        </>
      )}
    </>
  );
};

export default ReplyList;
