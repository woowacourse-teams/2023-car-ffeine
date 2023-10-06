package com.carffeine.carffeine.station.fixture.station;

import com.carffeine.carffeine.station.domain.city.City;
import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;

public class CityFixture {

    public static final City 서울특별시_정보 = City.builder()
            .name("서울특별시")
            .latitude(Latitude.from("37.5666103"))
            .longitude(Longitude.from("126.9783882"))
            .build();
}
