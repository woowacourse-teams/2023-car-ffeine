package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;
import java.util.List;

public record StationSpecificResponse(
        String stationId,
        String stationName,
        String companyName,
        String address,
        String contact,
        List<ChargerSpecificResponse> chargers,
        Boolean isParkingFree,
        String operatingTime,
        String detailLocation,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isPrivate,
        String stationState,
        String privateReason
) {

    public static StationSpecificResponse from(Station station) {
        return new StationSpecificResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getAddress(),
                station.getContact(),
                ChargerSpecificResponse.from(station),
                station.getIsParkingFree(),
                station.getOperatingTime(),
                station.getDetailLocation(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                station.getIsPrivate(),
                station.getStationState(),
                station.getPrivateReason()
        );
    }
}
