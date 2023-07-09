package com.carffeine.carffeine.dto;

import java.math.BigDecimal;

public record CoordinateRequest(
        BigDecimal centerLatitude,
        BigDecimal centerLongitude,
        BigDecimal deltaLatitude,
        BigDecimal deltaLongitude
) {
}
