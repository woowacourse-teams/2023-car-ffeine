package com.carffeine.carffeine.station.infrastructure.dto;

import java.math.BigDecimal;

public record StationSummaryResponse(
        String stationId,
        String companyName,
        String stationName,
        String address,
        String operationTime,
        boolean isParkingFree,
        boolean isPrivate,
        BigDecimal latitude,
        BigDecimal longitude,
        long quickChargerCount
) {
}
