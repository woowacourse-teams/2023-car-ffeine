package com.carffeine.carffeine.controller.chargerStation.dto;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.charger.Charger;

import java.math.BigDecimal;
import java.util.List;

public record ChargerSimpleResponse(
        String type,
        BigDecimal price,
        BigDecimal capacity
) {

    public static List<ChargerSimpleResponse> from(ChargeStation station) {
        return station.getChargers().stream()
                .map(ChargerSimpleResponse::from)
                .toList();
    }

    private static ChargerSimpleResponse from(Charger charger) {
        return new ChargerSimpleResponse(
                charger.getType().name(),
                charger.getPrice(),
                charger.getCapacity()
        );
    }
}
