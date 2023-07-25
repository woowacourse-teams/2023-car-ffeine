package com.carffeine.carffeine.station.domain.congestion;

import lombok.Getter;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Getter
public enum RequestPeriod {

    ZERO(0),
    TWELVE(1200);

    private static final int UNIT = 100;
    private static final List<RequestPeriod> periods = Arrays.stream(values())
            .sorted(Comparator.comparingInt(RequestPeriod::getSection))
            .toList();

    private final int section;

    RequestPeriod(int section) {
        this.section = section;
    }

    public static RequestPeriod from(int hour) {
        return periods.stream()
                .filter(it -> it.section <= hour * UNIT)
                .findFirst()
                .orElseThrow();
    }
}
