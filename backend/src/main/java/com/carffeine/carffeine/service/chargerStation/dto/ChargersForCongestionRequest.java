package com.carffeine.carffeine.service.chargerStation.dto;

public record ChargersForCongestionRequest(
        Items items,
        int totalCount,
        int pageNo,
        String resultCode,
        int numOfRows
) {
}
