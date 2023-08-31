package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.station.controller.review.dto.TotalRatingsResponse;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewQueryRepository;
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
