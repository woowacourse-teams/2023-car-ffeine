package com.carffeine.carffeine.station.infrastructure.repository.city.dto;

import java.math.BigDecimal;

public record CitySearchResponse(
        String cityName,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
