package com.carffeine.carffeine.dto;

import java.math.BigDecimal;

public record ChargerSimpleResponse(
        String type,
        int totalCount,
        int availableCount,
        BigDecimal capacity
) {
}
