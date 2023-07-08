package com.carffeine.carffeine.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.DayOfWeek;

@Entity
public class PeriodicCongestion {
    @Id
    private Long id;
    private DayOfWeek dayOfWeek;
    private int startTime;
    private int useCount;
    private int totalCount;
    private double congestion;

    public PeriodicCongestion(IdGenerator idGenerator, DayOfWeek dayOfWeek, int startTime, int useCount, int totalCount, double congestion) {
        id = IdGenerator.generateId(dayOfWeek,startTime);
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.useCount = useCount;
        this.totalCount = totalCount;
        this.congestion = congestion;
    }
}
