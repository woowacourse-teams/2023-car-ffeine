package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.util.List;

public record StationsSimpleResponse(List<StationSimpleResponse> stations, boolean hasNextPage) {


    public static StationsSimpleResponse from(List<Station> stations) {
        List<StationSimpleResponse> simpleResponses = stations.stream()
                .map(it -> new StationSimpleResponse(
                        it.getStationId(),
                        it.getStationName(),
                        it.getCompanyName(),
                        it.getAddress(),
                        ChargerSimpleResponse.from(it),
                        it.isParkingFree(),
                        it.getOperatingTime(),
                        it.getDetailLocation(),
                        it.getLatitude().getValue(),
                        it.getLongitude().getValue(),
                        it.isPrivate(),
                        it.getTotalCount(),
                        it.getAvailableCount()
                )).limit(10)
                .toList();

        if (stations.size() != 11) {
            return new StationsSimpleResponse(simpleResponses, false);
        }

        return new StationsSimpleResponse(simpleResponses, true);
    }
}

