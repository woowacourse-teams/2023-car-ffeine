package com.carffeine.carffeine.domain.chargestation.congestion;

import com.carffeine.carffeine.domain.chargestation.charger.Charger;

import java.time.DayOfWeek;

public class IdGenerator {

    private IdGenerator() {
    }

    public static String generateIdWithCharger(DayOfWeek dayOfWeek, RequestPeriod startTime, Charger charger) {
        return generateId(dayOfWeek, startTime, charger.getStationId(), charger.getChargerId());
    }

    public static String generateId(DayOfWeek dayOfWeek, RequestPeriod startTime, String stationId, String chargerId) {
        return dayOfWeek.getValue() * 10000L + startTime.getSection() + stationId + chargerId;
    }
}
