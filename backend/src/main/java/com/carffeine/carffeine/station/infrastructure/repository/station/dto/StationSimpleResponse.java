package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import java.math.BigDecimal;

public record StationSimpleResponse(
        String stationId,
        String stationName,
        BigDecimal latitude,
        BigDecimal longitude,
        boolean isParkingFree,
        boolean isPrivate,
        long availableCount,
        long quickChargerCount
) {
}
