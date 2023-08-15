package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;

public record StationPageResponse(
        String stationId,
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

    public static StationPageResponse from(Station station) {
        return new StationPageResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getContact(),
                station.getDetailLocation(),
                station.isParkingFree(),
                station.isPrivate(),
                station.getOperatingTime(),
                station.getPrivateReason(),
                station.getStationState(),
                station.getAddress(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue()
        );
    }
}
