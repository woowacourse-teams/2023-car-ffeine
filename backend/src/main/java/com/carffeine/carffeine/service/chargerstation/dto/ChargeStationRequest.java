package com.carffeine.carffeine.service.chargerstation.dto;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.charger.Charger;

import java.util.List;

public record ChargeStationRequest(
        int numOfRows,
        String resultCode,
        ChargeStationsInfoRequest items,
        int pageNo,
        int totalCount,
        String resultMsg
) {
    public List<ChargeStation> toStations() {
        return items.toStations();
    }

    public List<Charger> toChargers() {
        return items.toChargers();
    }
}
