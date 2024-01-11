package com.carffeine.carffeine.station.infrastructure.repository.charger.dto;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;

public record ChargerStatusResponse(
        String stationId,
        String chargerId,
        ChargerCondition chargerCondition
) {
}
