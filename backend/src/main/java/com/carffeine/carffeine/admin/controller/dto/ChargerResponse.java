package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;

public record ChargerResponse(
        String chargerId,
        ChargerType type,
        BigDecimal price,
        BigDecimal capacity,
        String method
) {
    public static ChargerResponse from(Charger charger) {
        return new ChargerResponse(
                charger.getChargerId(),
                charger.getType(),
                charger.getPrice(),
                charger.getCapacity(),
                charger.getMethod()
        );
    }
}
