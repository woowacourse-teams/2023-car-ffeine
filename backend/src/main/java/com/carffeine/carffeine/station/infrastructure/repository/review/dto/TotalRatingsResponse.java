package com.carffeine.carffeine.station.infrastructure.repository.review.dto;

public record TotalRatingsResponse(
        Double totalRatings,
        Long totalCount
) {
}
