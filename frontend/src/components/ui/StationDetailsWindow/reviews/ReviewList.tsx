import React from 'react';

import { useInfiniteReviews } from '@hooks/tanstack-query/station-details/reviews/useInfiniteReviews';

import Text from '@common/Text';

import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';
import ReviewCardSkeleton from '@ui/StationDetailsWindow/reviews/ReviewCardSkeleton';

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
        <>
          {Array(10)
            .fill({ length: 10 })
            .map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
        </>
      ) : status === 'error' ? (
        <span>Error: {JSON.stringify(error)}</span>
      ) : (
        <>
          <div>
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
          </div>
          <div>
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </>
      )}
    </div>
  );
}
