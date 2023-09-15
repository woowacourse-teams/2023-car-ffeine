import { css } from 'styled-components';

import { useEffect, useRef } from 'react';

import { useInfiniteReviews } from '@hooks/tanstack-query/station-details/reviews/useInfiniteReviews';

import Box from '@common/Box';
import Text from '@common/Text';

import ReviewCard from '@ui/StationDetailsWindow/reviews/reviews/ReviewCard';
import ReviewCardsLoading from '@ui/StationDetailsWindow/reviews/reviews/ReviewCardsLoading';
import ReviewCreate from '@ui/StationDetailsWindow/reviews/reviews/ReviewCreate';

export interface ReviewListProps {
  stationId: string;
}

export default function ReviewList({ stationId }: ReviewListProps) {
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteReviews(stationId);

  const loadMoreElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    });

    if (loadMoreElementRef.current) {
      observer.observe(loadMoreElementRef.current);
    }

    return () => {
      if (loadMoreElementRef.current) {
        observer.unobserve(loadMoreElementRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <Box p={4} css={reviewListCss}>
        <Text variant="title" mt={2} mb={5} px={4}>
          충전소 후기 보기
        </Text>
        {status === 'loading' ? (
          <ReviewCardsLoading count={1} />
        ) : status === 'error' ? (
          <Text variant="caption" align="center">
            Error: {JSON.stringify(error)}
          </Text>
        ) : (
          <>
            {data.pages.map((page) => (
              <div key={page.nextPage}>
                {page.reviews.length === 0 && (
                  <Text m={10} align="center">
                    등록 된 후기가 없습니다.
                  </Text>
                )}
                {page.reviews.map((review) => (
                  <ReviewCard
                    key={review.reviewId}
                    stationId={stationId}
                    review={review}
                    previewMode={false}
                  />
                ))}
              </div>
            ))}
            {isFetchingNextPage && <ReviewCardsLoading count={10} />}
            <div ref={loadMoreElementRef} />
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

const reviewListCss = css`
  width: 40rem;
`;
