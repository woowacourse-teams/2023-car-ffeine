package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

public record ChargerStatusResponse(
        String stationId,
        long availableCount
) {
}
