package com.carffeine.carffeine.domain;

import java.time.DayOfWeek;

public class IdGenerator {
    private IdGenerator() {
    }

    public static long generateId(DayOfWeek dayOfWeek, int startTime) {
        return dayOfWeek.getValue() * 10000L + startTime;
    }
}
