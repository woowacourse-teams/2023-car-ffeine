package com.carffeine.carffeine.domain.chargerStation.congestion;

import com.carffeine.carffeine.domain.chargerStation.charger.Charger;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.DayOfWeek;

@Getter
@AllArgsConstructor
@Entity
public class PeriodicCongestion {
    @Id
    private String id;
    private DayOfWeek dayOfWeek;
    private RequestPeriod startTime;
    private int useCount;
    private int totalCount;
    private double congestion;

    public PeriodicCongestion(Charger charger, DayOfWeek dayOfWeek, RequestPeriod startTime, int useCount, int totalCount, double congestion) {
        id = IdGenerator.generateIdWithCharger(dayOfWeek, startTime, charger);
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.useCount = useCount;
        this.totalCount = totalCount;
        this.congestion = congestion;
    }

    public static PeriodicCongestion of(DayOfWeek dayOfWeek, RequestPeriod startTime, int useCount, int totalCount, String stationId, String chargerId) {
        String id = IdGenerator.generateId(dayOfWeek, startTime, stationId, chargerId);
        double congestion = (double) useCount / totalCount;
        return new PeriodicCongestion(id, dayOfWeek, startTime, useCount, totalCount, congestion);
    }
}
