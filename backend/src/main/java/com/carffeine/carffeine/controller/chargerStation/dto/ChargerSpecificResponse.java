package com.carffeine.carffeine.controller.chargerStation.dto;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ChargerSpecificResponse(
        String type,
        BigDecimal price,
        BigDecimal capacity,
        LocalDateTime latestUpdateTime,
        Boolean state,
        String method
) {

    public static List<ChargerSpecificResponse> from(ChargeStation station) {
        return station.getChargers().stream()
                .map(it -> new ChargerSpecificResponse(
                        it.getType(),
                        it.getPrice(),
                        it.getCapacity(),
                        it.getChargerStatus().getLatestUpdateTime(),
                        it.getChargerStatus().getChargerState().isStandBy(),
                        it.getMethod())
                ).toList();
    }
}
