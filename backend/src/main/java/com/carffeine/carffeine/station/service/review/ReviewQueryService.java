package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.TotalRatingsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ReviewQueryService {

    private final ReviewQueryRepository reviewQueryRepository;

    public TotalRatingsResponse findTotalRatings(String stationId) {
        return reviewQueryRepository.findTotalRatings(stationId);
    }
}
