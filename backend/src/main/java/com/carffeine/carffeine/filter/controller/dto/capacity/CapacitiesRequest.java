package com.carffeine.carffeine.filter.controller.dto.capacity;

import java.math.BigDecimal;
import java.util.List;

public record CapacitiesRequest(List<BigDecimal> capacities) {
}
