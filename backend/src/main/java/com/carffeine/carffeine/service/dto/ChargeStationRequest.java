package com.carffeine.carffeine.service.dto;

public record ChargeStationRequest(
        int numOfRows,
        String resultCode,
        ChargeStationsInfoRequest items,
        int pageNo,
        int totalCount,
        String resultMsg
) {
}
