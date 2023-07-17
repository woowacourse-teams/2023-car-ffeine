package com.carffeine.carffeine.controller.chargerStation.dto;

public record StatisticsResponse(
        String stationId,
        CongestionResponse congestion
) {
}
