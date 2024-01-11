package com.carffeine.carffeine.admin.service.dto;

import com.carffeine.carffeine.station.domain.Latitude;
import com.carffeine.carffeine.station.domain.Longitude;
import com.carffeine.carffeine.station.domain.Station;

import java.math.BigDecimal;

public record StationUpdateRequest(
        String stationName,
        String companyName,
        String contact,
        String detailLocation,
        Boolean isParkingFree,
        Boolean isPrivate,
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
                .privateReason(privateReason)
                .address(address)
                .latitude(Latitude.from(latitude))
                .longitude(Longitude.from(longitude))
                .build();
    }
}


