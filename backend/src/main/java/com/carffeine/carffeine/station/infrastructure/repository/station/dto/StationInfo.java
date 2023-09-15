package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import java.math.BigDecimal;

public record StationInfo(
        String stationId,
        String stationName,
        String address,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
