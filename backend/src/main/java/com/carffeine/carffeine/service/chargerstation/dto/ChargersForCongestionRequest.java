package com.carffeine.carffeine.service.chargerstation.dto;

public record ChargersForCongestionRequest(
        Items items,
        int totalCount,
        int pageNo,
        String resultCode,
        int numOfRows
) {
}
