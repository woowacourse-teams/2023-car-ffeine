package com.carffeine.carffeine.station.dto;

public record StatisticsResponse(
        String stationId,
        CongestionResponse congestion
) {
}
