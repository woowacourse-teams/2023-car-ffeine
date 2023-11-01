package com.carffeine.carffeine.station.service.station.dto;

import java.math.BigDecimal;

public record CoordinateRequest(
        BigDecimal latitude,
        BigDecimal longitude,
        BigDecimal latitudeDelta,
        BigDecimal longitudeDelta
) {
}
