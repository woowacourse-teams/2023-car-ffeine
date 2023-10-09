package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.city.City;

import java.util.List;
import java.util.stream.Collectors;

public record CitiesResponse(List<CityResponse> cities) {

    public static CitiesResponse from(List<City> cities) {
        return cities.stream()
                .map(CityResponse::from)
                .collect(Collectors.collectingAndThen(Collectors.toList(), CitiesResponse::new));
    }
}
