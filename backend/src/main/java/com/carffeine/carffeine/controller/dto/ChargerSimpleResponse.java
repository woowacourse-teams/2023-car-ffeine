package com.carffeine.carffeine.controller.dto;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.Charger;

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
                charger.getType(),
                charger.getPrice(),
                charger.getCapacity()
        );
    }
}
