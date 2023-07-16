package com.carffeine.carffeine.controller.chargerStation.dto;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;

import java.util.List;

public record ChargeStationsSimpleResponse(List<ChargeStationSimpleResponse> stations) {

    public static ChargeStationsSimpleResponse from(List<ChargeStation> chargeStations) {
        List<ChargeStationSimpleResponse> simpleResponses = chargeStations.stream()
                .map(it -> new ChargeStationSimpleResponse(
                        it.getStationId(),
                        it.getStationName(),
                        it.getCompanyName(),
                        ChargerSimpleResponse.from(it),
                        it.getIsParkingFree(),
                        it.getOperatingTime(),
                        it.getDetailLocation(),
                        it.getLatitude().getValue(),
                        it.getLongitude().getValue(),
                        it.getIsPrivate(),
                        it.getTotalCount(),
                        it.getAvailableCount()
                ))
                .toList();
        return new ChargeStationsSimpleResponse(simpleResponses);
    }
}

