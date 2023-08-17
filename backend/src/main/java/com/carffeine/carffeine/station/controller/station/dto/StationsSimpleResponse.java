package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.station.Station;

import java.util.List;

public record StationsSimpleResponse(List<StationSimpleResponse> stations) {


    public static StationsSimpleResponse from(List<Station> stations) {
        List<StationSimpleResponse> simpleResponses = stations.stream()
                .map(StationSimpleResponse::from)
                .toList();

        return new StationsSimpleResponse(simpleResponses);
    }
}

