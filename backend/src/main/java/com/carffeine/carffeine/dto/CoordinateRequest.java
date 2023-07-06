package com.carffeine.carffeine.dto;

import java.math.BigDecimal;

public record CoordinateRequest(
        BigDecimal centerX,
        BigDecimal centerY,
        BigDecimal deltaX,
        BigDecimal deltaY
) {
}
