package com.carffeine.carffeine.dto;

import com.carffeine.carffeine.domain.ChargeStation;

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
