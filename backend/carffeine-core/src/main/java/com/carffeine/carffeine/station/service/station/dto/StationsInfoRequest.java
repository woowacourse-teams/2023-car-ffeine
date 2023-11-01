package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.station.Station;

import java.util.List;

public record StationsInfoRequest(
        List<StationInfoRequest> item
) {

    public List<Station> toStations() {
        return item.stream()
                .map(StationInfoRequest::toStation)
                .toList();
    }

    public List<Charger> toChargers() {
        return item.stream()
                .map(StationInfoRequest::toCharger)
                .toList();
    }
}
