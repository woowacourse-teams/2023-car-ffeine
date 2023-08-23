package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Station;

import java.math.BigDecimal;
import java.util.List;

public record ChargerSimpleResponse(
        ChargerType type,
        BigDecimal price,
        BigDecimal capacity
) {

    public static List<ChargerSimpleResponse> from(Station station) {
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
