package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.util.List;

public record StationInfo(
        String stationId,
        String stationName,
        String address,
        BigDecimal latitude,
        BigDecimal longitude,
        long quickChargerCount,
        String companyName,
        List<ChargerType> chargerType,
        List<BigDecimal> capacity,
        boolean isParkingFree,
        boolean isPrivate
) {
}
