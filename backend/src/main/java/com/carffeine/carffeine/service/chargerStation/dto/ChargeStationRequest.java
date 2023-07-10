package com.carffeine.carffeine.service.chargerStation.dto;

public record ChargeStationRequest(
        int numOfRows,
        String resultCode,
        ChargeStationsInfoRequest items,
        int pageNo,
        int totalCount,
        String resultMsg
) {
}
