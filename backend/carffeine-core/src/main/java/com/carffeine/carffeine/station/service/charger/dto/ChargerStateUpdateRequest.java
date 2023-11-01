package com.carffeine.carffeine.station.service.charger.dto;

public record ChargerStateUpdateRequest(
        int totalCount,
        ChargersStateRequest items,
        int pageNo,
        String resultCode,
        int numOfRows
) {
}
