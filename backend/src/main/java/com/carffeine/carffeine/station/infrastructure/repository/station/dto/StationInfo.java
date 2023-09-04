package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.util.List;

public record StationInfo(
        String stationId,
        String stationName,
        List<ChargerType> chargerTypes,
        String address,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
