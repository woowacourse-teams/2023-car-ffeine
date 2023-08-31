package com.carffeine.carffeine.station.controller.review.dto;

public record TotalRatingsResponse(
        Double totalRatings,
        Long totalCount
) {

    public static TotalRatingsResponse of(Double totalRatings, Long totalCount) {
        return new TotalRatingsResponse(totalRatings, totalCount);
    }
}
