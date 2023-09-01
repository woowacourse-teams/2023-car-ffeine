package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReviewResponse;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReviewResponses;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.TotalRatingsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ReviewQueryService {

    private static final int NEXT_PAGE_INDEX = 1;
    private static final int NO_MORE_PAGE = -1;

    private final ReviewQueryRepository reviewQueryRepository;

    public ReviewResponses findAllReviews(String stationId, Pageable pageable) {
        Page<ReviewResponse> allReviews = reviewQueryRepository.findAllReviews(stationId, pageable);
        return new ReviewResponses(allReviews.getContent(), getNextPage(pageable.getPageNumber(), allReviews));
    }

    private static int getNextPage(int pageNumber, Page<ReviewResponse> allReviews) {
        if (allReviews.hasNext()) {
            return pageNumber + NEXT_PAGE_INDEX;
        }
        return NO_MORE_PAGE;
    }

    public TotalRatingsResponse findTotalRatings(String stationId) {
        return reviewQueryRepository.findTotalRatings(stationId);
    }
}
