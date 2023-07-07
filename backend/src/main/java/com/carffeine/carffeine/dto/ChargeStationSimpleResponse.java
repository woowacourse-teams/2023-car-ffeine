package com.carffeine.carffeine.dto;

import java.math.BigDecimal;
import java.util.List;

public record ChargeStationSimpleResponse(
        String stationId,
        String stationName,
        String companyName,
        List<ChargerSimpleResponse> chargers,
        Boolean isParkingFree,
        String operatingTime,
        String detailLocation,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isPrivate
) {
}
