package com.carffeine.carffeine.station.domain.congestion;

import java.time.DayOfWeek;

public class IdGenerator {

    private IdGenerator() {
    }

    public static String generateId(DayOfWeek dayOfWeek, RequestPeriod startTime, String stationId, String chargerId) {
        return dayOfWeek.getValue() * 10000L + startTime.getSection() + stationId + chargerId;
    }
}
