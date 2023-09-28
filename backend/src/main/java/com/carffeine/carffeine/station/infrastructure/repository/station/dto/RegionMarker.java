package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import java.math.BigDecimal;

public record RegionMarker(
        String regionName,
        BigDecimal latitude,
        BigDecimal longitude,
        long count
) {
}
