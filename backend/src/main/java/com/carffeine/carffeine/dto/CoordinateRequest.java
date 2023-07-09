package com.carffeine.carffeine.dto;

import java.math.BigDecimal;

public record CoordinateRequest(
        BigDecimal latitude,
        BigDecimal longitude,
        BigDecimal latitudeDelta,
        BigDecimal longitudeDelta
) {
}
