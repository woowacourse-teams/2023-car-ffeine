package com.carffeine.carffeine.admin.service.dto;

import java.math.BigDecimal;

public record CityCreateRequest(String name,
                                BigDecimal longitude,
                                BigDecimal latitude) {
}
