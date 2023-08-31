package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewResponse;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewResponses;
import com.carffeine.carffeine.station.infrastructure.repository.review.TotalRatingsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ReviewQueryService {

    private final ReviewQueryRepository reviewQueryRepository;

    public ReviewResponses findAllReviews(String stationId, Pageable pageable) {
        Page<ReviewResponse> allReviews = reviewQueryRepository.findAllReviews(stationId, pageable);
        return new ReviewResponses(allReviews.getContent(), allReviews.hasNext() ? pageable.getPageNumber() + 1 : -1);
    }

    public TotalRatingsResponse findTotalRatings(String stationId) {
        return reviewQueryRepository.findTotalRatings(stationId);
    }
}
