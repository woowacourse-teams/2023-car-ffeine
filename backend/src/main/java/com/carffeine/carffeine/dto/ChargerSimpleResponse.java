package com.carffeine.carffeine.dto;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.Charger;

import java.math.BigDecimal;
import java.util.List;

public record ChargerSimpleResponse(
        String type,
        int totalCount,
        int availableCount,
        BigDecimal capacity
) {

    public static List<ChargerSimpleResponse> from(ChargeStation station) {
        return station.getChargers().stream()
                .map(it -> ChargerSimpleResponse.of(station, it))
                .toList();
    }

    private static ChargerSimpleResponse of(ChargeStation station, Charger charger) {
        return new ChargerSimpleResponse(
                charger.getType(),
                station.getTotalCount(),
                station.getAvailableCount(),
                charger.getCapacity()
        );
    }
}
