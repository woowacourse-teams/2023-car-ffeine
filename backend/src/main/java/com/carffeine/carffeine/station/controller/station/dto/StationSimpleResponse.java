package com.carffeine.carffeine.station.controller.station.dto;

import java.math.BigDecimal;
import java.util.List;

public record StationSimpleResponse(
        String stationId,
        String stationName,
        String companyName,
        String address,
        List<ChargerSimpleResponse> chargers,
        Boolean isParkingFree,
        String operatingTime,
        String detailLocation,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isPrivate,
        int totalCount,
        int availableCount
) {
}
