package com.carffeine.carffeine.station.infrastructure.repository.review;

public record TotalRatingsResponse(
        Double totalRatings,
        Long totalCount
) {

    public static TotalRatingsResponse of(Double totalRatings, Long totalCount) {
        return new TotalRatingsResponse(totalRatings, totalCount);
    }
}
