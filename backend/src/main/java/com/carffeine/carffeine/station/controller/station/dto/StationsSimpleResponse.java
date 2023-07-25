package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.util.List;

public record StationsSimpleResponse(List<StationSimpleResponse> stations) {

    public static StationsSimpleResponse from(List<Station> stations) {
        List<StationSimpleResponse> simpleResponses = stations.stream()
                .map(it -> new StationSimpleResponse(
                        it.getStationId(),
                        it.getStationName(),
                        it.getCompanyName(),
                        it.getAddress(),
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
        return new StationsSimpleResponse(simpleResponses);
    }
}

