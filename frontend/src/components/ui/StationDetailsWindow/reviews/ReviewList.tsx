import React from 'react';

import { useInfiniteReviews } from '@hooks/tanstack-query/station-details/reviews/useInfiniteReviews';

import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';
import ReviewCardsLoading from '@ui/StationDetailsWindow/reviews/ReviewCardsLoading';

import type { Review } from '@type';

export interface ReviewListProps {
  stationId: string;
}

export default function ReviewList({ stationId }: ReviewListProps) {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteReviews(stationId);

  return (
    <div>
      <Text variant="title" mb={5}>
        충전소 후기 보기
      </Text>
      {status === 'loading' ? (
        <ReviewCardsLoading />
      ) : status === 'error' ? (
        <Text variant="caption" align="center">
          Error: {JSON.stringify(error)}
        </Text>
      ) : (
        <>
          {data.pages.map((page) => (
            <div key={page.currentPage}>
              {(page.reviews as Review[]).map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  review={{
                    content: review.content,
                    isDeleted: review.isDeleted,
                    isUpdated: review.isUpdated,
                    latestUpdateDate: review.latestUpdateDate,
                    ratings: review.ratings,
                    replies: review.replies,
                    reviewId: review.reviewId,
                    userId: review.userId,
                  }}
                />
              ))}
            </div>
          ))}
          {isFetchingNextPage && <ReviewCardsLoading />}
          <ButtonNext
            variant="contained"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            fullWidth
          >
            {isFetchingNextPage
              ? '로딩중...'
              : hasNextPage
              ? '후기 더 보기 (무한스크롤로 수정 예정)'
              : '더 이상 후기가 없습니다.'}
          </ButtonNext>
        </>
      )}
    </div>
  );
}
