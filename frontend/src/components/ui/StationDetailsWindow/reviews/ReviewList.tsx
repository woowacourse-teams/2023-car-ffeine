import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';

import { SERVERS } from '@constants';

import type { Review } from '@type';

export interface ReviewListProps {
  stationId: string;
}

export default function ReviewList({ stationId }: ReviewListProps) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(
    ['reviews', stationId],
    async ({ pageParam = 1 }) => {
      const mode = serverStore.getState();
      const res = await fetch(`${SERVERS[mode]}/stations/${stationId}/reviews/?page=${pageParam}`);
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage > 0 ? lastPage.nextPage : undefined;
      },
    }
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === 'loading' ? (
        <p>Loading...</p>
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
