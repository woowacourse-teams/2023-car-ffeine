package com.carffeine.carffeine.station.infrastructure.dto;

import java.math.BigDecimal;

public record StationInfo(
        String stationId,
        String stationName,
        String address,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
