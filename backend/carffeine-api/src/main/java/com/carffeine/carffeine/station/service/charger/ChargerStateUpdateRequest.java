package com.carffeine.carffeine.station.service.charger;

public record ChargerStateUpdateRequest(
        int totalCount,
        ChargersStateRequest items,
        int pageNo,
        String resultCode,
        int numOfRows
) {
}
