package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import java.math.BigDecimal;

public record StationPoint(
        BigDecimal latitude,
        BigDecimal longitude
) {
}
