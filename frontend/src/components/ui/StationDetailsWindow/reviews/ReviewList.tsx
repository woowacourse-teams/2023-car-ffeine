import { css } from 'styled-components';

import React from 'react';

import { useInfiniteReviews } from '@hooks/tanstack-query/station-details/reviews/useInfiniteReviews';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import ReviewCard from '@ui/StationDetailsWindow/reviews/cards/ReviewCard';
import ReviewCardsLoading from '@ui/StationDetailsWindow/reviews/cards/ReviewCardsLoading';
import ReviewCreate from '@ui/StationDetailsWindow/reviews/crud/ReviewCreate';

import type { Review } from '@type';

export interface ReviewListProps {
  stationId: string;
}

export default function ReviewList({ stationId }: ReviewListProps) {
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteReviews(stationId);

  if (isFetching) {
    return <ReviewCardsLoading count={10} />;
  }

  return (
    <>
      <Box p={4}>
        <Text variant="title" mt={2} mb={5} px={4}>
          충전소 후기 보기
        </Text>
        {status === 'loading' ? (
          <ReviewCardsLoading count={10} />
        ) : status === 'error' ? (
          <Text variant="caption" align="center">
            Error: {JSON.stringify(error)}
          </Text>
        ) : (
          <>
            {data.pages.map((page) => (
              <div key={page.currentPage}>
                {page.reviews.length === 0 && (
                  <Text m={10} align="center">
                    등록 된 후기가 없습니다.
                  </Text>
                )}
                {(page.reviews as Review[]).map((review) => (
                  <ReviewCard
                    key={review.reviewId}
                    stationId={stationId}
                    review={review}
                    previewMode
                  />
                ))}
              </div>
            ))}
            {isFetchingNextPage && <ReviewCardsLoading count={10} />}
            <ButtonNext
              variant="contained"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              fullWidth
            >
              {isFetchingNextPage
                ? '로딩중...'
                : hasNextPage
                ? '후기 더 보기'
                : '더 이상 후기가 없습니다.'}
              (무한스크롤로 제거 예정)
            </ButtonNext>
          </>
        )}
      </Box>
      <Box css={modalButtonCss}>
        <ReviewCreate stationId={stationId} />
      </Box>
    </>
  );
}

const modalButtonCss = css`
  position: sticky;
  bottom: 0;
  background: white;
`;
