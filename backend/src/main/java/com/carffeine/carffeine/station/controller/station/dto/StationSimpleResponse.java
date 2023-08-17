package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;
import java.util.List;

public record StationSimpleResponse(
        String stationId,
        String stationName,
        String companyName,
        String address,
        List<ChargerSimpleResponse> chargers,
        Boolean isParkingFree,
        String operatingTime,
        String detailLocation,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isPrivate,
        int totalCount,
        int availableCount
) {

    public static StationSimpleResponse from(Station station) {
        return new StationSimpleResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getAddress(),
                ChargerSimpleResponse.from(station),
                station.isParkingFree(),
                station.getOperatingTime(),
                station.getDetailLocation(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                station.isPrivate(),
                station.getTotalCount(),
                station.getAvailableCount()
        );
    }
}
