package com.carffeine.carffeine.city.service.dto;

import com.carffeine.carffeine.city.domain.City;
import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;

public record CityRequest(
        String name,
        String latitude,
        String longitude
) {

    public City toCity() {
        return City.builder()
                .name(name)
                .latitude(Latitude.from(latitude))
                .longitude(Longitude.from(longitude))
                .build();
    }
}
