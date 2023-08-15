package com.carffeine.carffeine.station.controller.review.dto;

public record TotalRatingsResponse(
        double totalRatings,
        long totalCount
) {

    public static TotalRatingsResponse of(double totalRatings, long totalCount) {
        return new TotalRatingsResponse(totalRatings, totalCount);
    }
}
