package com.carffeine.carffeine.admin.service.dto;

import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;
import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;

public record StationUpdateRequest(
        String stationName,
        String companyName,
        String contact,
        String detailLocation,
        boolean isParkingFree,
        boolean isPrivate,
        String operationTime,
        String privateReason,
        String stationState,
        String address,
        BigDecimal latitude,
        BigDecimal longitude
) {

    public Station toDomain() {
        return Station.builder()
                .stationName(stationName)
                .companyName(companyName)
                .contact(contact)
                .detailLocation(detailLocation)
                .isParkingFree(isParkingFree)
                .isPrivate(isPrivate)
                .operatingTime(operationTime)
                .stationState(stationState)
                .address(address)
                .latitude(Latitude.from(latitude))
                .longitude(Longitude.from(longitude))
                .build();
    }
}


