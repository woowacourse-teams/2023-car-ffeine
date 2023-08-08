package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;
import java.util.List;

public record StationResponse(
        String stationId,
        String stationName,
        String companyName,
        String contact,
        String detailLocation,
        boolean isParkingFree,
        boolean isPrivate,
        String operationTime,
        String address,
        BigDecimal latitude,
        BigDecimal longitude,
        List<ChargerResponse> chargers
) {
    public static StationResponse from(Station station) {
        return new StationResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getContact(),
                station.getDetailLocation(),
                station.getIsParkingFree(),
                station.getIsPrivate(),
                station.getOperatingTime(),
                station.getAddress(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                getChargerResponses(station)
        );
    }

    private static List<ChargerResponse> getChargerResponses(Station station) {
        return station.getChargers().stream()
                .map(ChargerResponse::from)
                .toList();
    }
}
