package com.carffeine.carffeine.service.chargerStation.dto;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.charger.Charger;

import java.util.List;

public record ChargeStationsInfoRequest(
        List<ChargeStationInfoRequest> item
) {

    public List<ChargeStation> toStations() {
        return item.stream()
                .map(ChargeStationInfoRequest::toStation)
                .toList();
    }

    public List<Charger> toChargers() {
        return item.stream()
                .map(ChargeStationInfoRequest::toCharger)
                .toList();
    }
}
