package com.carffeine.carffeine.review.infrastructure.dto;

public record TotalRatingsResponse(
        Double totalRatings,
        Long totalCount
) {
}
