package com.carffeine.carffeine.filter.controller.dto.capacity;

import com.carffeine.carffeine.filter.domain.capacity.Capacity;

import java.math.BigDecimal;

public record CapacityResponse(BigDecimal capacity) {

    public static CapacityResponse from(Capacity capacity) {
        return new CapacityResponse(capacity.getCapacity());
    }
}
