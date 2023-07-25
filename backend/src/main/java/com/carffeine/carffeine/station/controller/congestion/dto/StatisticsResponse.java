package com.carffeine.carffeine.station.controller.congestion.dto;

public record StatisticsResponse(
        String stationId,
        CongestionResponse congestion
) {
}
