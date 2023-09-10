package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ChargerSpecificResponse(
        ChargerType type,
        BigDecimal price,
        BigDecimal capacity,
        LocalDateTime latestUpdateTime,
        ChargerCondition state,
        String method
) {
}
