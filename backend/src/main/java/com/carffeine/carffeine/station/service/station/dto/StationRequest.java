package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.station.Station;

import java.util.List;

public record StationRequest(
        int numOfRows,
        String resultCode,
        StationsInfoRequest items,
        int pageNo,
        int totalCount,
        String resultMsg
) {
    public List<Station> toStations() {
        return items.toStations();
    }

    public List<Charger> toChargers() {
        return items.toChargers();
    }
}
