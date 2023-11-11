package com.carffeine.carffeine.station.infrastructure.dto;

import java.math.BigDecimal;
import java.util.List;

public record StationSpecificResponse(
        String stationId,
        String stationName,
        String companyName,
        String address,
        String contact,
        Boolean isParkingFree,
        String operatingTime,
        String detailLocation,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isPrivate,
        String stationState,
        String privateReason,
        Long reportCount,
        List<ChargerSpecificResponse> chargers
) {
}
