package com.carffeine.carffeine.service.chargerstation.dto;

public record ChargerStateUpdateRequest(
        int totalCount,
        ChargersStateRequest items,
        int pageNo,
        String resultCode,
        int numOfRows
) {
}
