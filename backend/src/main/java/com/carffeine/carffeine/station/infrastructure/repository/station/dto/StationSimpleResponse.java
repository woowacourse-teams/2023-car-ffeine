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
    public static StationSimpleResponse of(StationInfo stationInfo, Long availableCount) {
        return new StationSimpleResponse(
                stationInfo.stationId(),
                stationInfo.stationName(),
                stationInfo.latitude(),
                stationInfo.longitude(),
                stationInfo.isParkingFree(),
                stationInfo.isPrivate(),
                availableCount,
                stationInfo.quickChargerCount()
        );
    }
}
