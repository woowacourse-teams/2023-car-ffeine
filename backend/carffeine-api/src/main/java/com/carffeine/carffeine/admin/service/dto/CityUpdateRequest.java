package com.carffeine.carffeine.admin.service.dto;

import java.math.BigDecimal;

public record CityUpdateRequest(String name,
                                BigDecimal latitude,
                                BigDecimal longitude) {
}
