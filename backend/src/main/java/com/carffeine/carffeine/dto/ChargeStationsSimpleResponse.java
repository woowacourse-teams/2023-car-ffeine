package com.carffeine.carffeine.dto;

import com.carffeine.carffeine.domain.ChargeStation;

import java.util.List;

public record ChargeStationsSimpleResponse(List<ChargeStationSimpleResponse> stations) {

    public static ChargeStationsSimpleResponse of(List<ChargeStation> chargeStations) {
        List<ChargeStationSimpleResponse> simpleResponses = chargeStations.stream()
                .map(it -> new ChargeStationSimpleResponse(
                        it.getStationId(),
                        it.getStationName(),
                        it.getCompanyName(),
                        it.getChargers().stream()
                                .map(it2 -> new ChargerSimpleResponse(
                                        it2.getType(),
                                        it.getTotalCount(),
                                        it.getAvailableCount(),
                                        it2.getCapacity()
                                )).toList(),
                        it.getIsParkingFree(),
                        it.getOperatingTime(),
                        it.getDetailLocation(),
                        it.getLatitude().getValue(),
                        it.getLongitude().getValue(),
                        it.getIsPrivate()
                )).toList();
        return new ChargeStationsSimpleResponse(simpleResponses);
    }
}

