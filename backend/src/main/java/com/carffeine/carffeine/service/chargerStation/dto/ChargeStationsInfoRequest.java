package com.carffeine.carffeine.service.chargerStation.dto;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;

import java.util.List;

public record ChargeStationsInfoRequest(
        List<ChargeStationInfoRequest> item
) {

    public List<ChargeStation> toDomains() {
        return item.stream()
                .map(ChargeStationInfoRequest::toDomain)
                .toList();
    }
}
