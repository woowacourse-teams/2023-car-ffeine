package com.carffeine.carffeine.station.fixture.station;

import com.carffeine.carffeine.station.domain.city.City;
import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;

public class CityFixture {

    public static final City 서울특별시_송파구_잠실동_정보 = City.builder()
            .id(1L)
            .name("서울특별시 송파구 잠실동")
            .latitude(Latitude.from("37.5666103"))
            .longitude(Longitude.from("126.9783882"))
            .build();

    public static final City 서울특별시_송파구_가가동_정보 = City.builder()
            .id(2L)
            .name("서울특별시 송파구 가가동")
            .latitude(Latitude.from("37.5666103"))
            .longitude(Longitude.from("126.9783882"))
            .build();

    public static final City 서울특별시_송파구_신천동_정보 = City.builder()
            .id(3L)
            .name("서울특별시 송파구 신천동")
            .latitude(Latitude.from("37.5666103"))
            .longitude(Longitude.from("126.9783882"))
            .build();
}
