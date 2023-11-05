package com.carffeine.carffeine.station.infrastructure.dto;

import java.math.BigDecimal;

public record RegionMarker(
        String regionName,
        BigDecimal latitude,
        BigDecimal longitude,
        long count
) {
}
