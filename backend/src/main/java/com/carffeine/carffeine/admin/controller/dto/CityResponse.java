package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.city.City;

import java.math.BigDecimal;

public record CityResponse(Long id,
                           String name,
                           BigDecimal latitude,
                           BigDecimal longitude) {

    public static CityResponse from(City city) {
        return new CityResponse(
                city.getId(),
                city.getName(),
                city.getLatitude().getValue(),
                city.getLongitude().getValue()
        );
    }
}
