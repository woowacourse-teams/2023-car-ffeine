package com.carffeine.carffeine.city.infrastructure.repository.dto;

import java.math.BigDecimal;

public record CitySearchResponse(
        String cityName,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
