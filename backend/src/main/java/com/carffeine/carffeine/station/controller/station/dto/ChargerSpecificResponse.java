package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.domain.station.Station;

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

    public static List<ChargerSpecificResponse> from(Station station) {
        return station.getChargers().stream()
                .map(it -> new ChargerSpecificResponse(
                        it.getType().name(),
                        it.getPrice(),
                        it.getCapacity(),
                        it.getChargerStatus().getLatestUpdateTime(),
                        it.getChargerStatus().getChargerCondition().isStandBy(),
                        it.getMethod())
                ).toList();
    }
}
