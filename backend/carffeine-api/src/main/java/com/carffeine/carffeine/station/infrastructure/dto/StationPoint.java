package com.carffeine.carffeine.station.infrastructure.dto;

import java.math.BigDecimal;

public record StationPoint(
        BigDecimal latitude,
        BigDecimal longitude
) {
}
