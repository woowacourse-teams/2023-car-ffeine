package com.carffeine.carffeine.station.service.charger;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record ChargerStateRequest(
        String busiId,
        String statId,
        String chgerId,
        String stat,
        String statUpdDt,
        String lastTsdt,
        String lastTedt,
        String nowTsdt) {

    private static final int DATETIME_LENGTH = 14;

    public ChargerStatus toChargerStatus() {
        return ChargerStatus.builder()
                .stationId(statId)
                .chargerId(chgerId)
                .latestUpdateTime(parseDateTimeFromString(statUpdDt))
                .chargerCondition(ChargerCondition.from(stat))
                .build();
    }

    private LocalDateTime parseDateTimeFromString(String input) {
        if (input == null || input.length() != DATETIME_LENGTH) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return LocalDateTime.parse(input, formatter).minusHours(9);
    }
}
