package com.carffeine.carffeine.station.domain.congestion;

import lombok.Getter;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Getter
public enum RequestPeriod {

    ZERO(0),
    ONE(100),
    TWO(200),
    THREE(300),
    FOUR(400),
    FIVE(500),
    SIX(600),
    SEVEN(700),
    EIGHT(800),
    NINE(900),
    TEN(1000),
    ELEVEN(1100),
    TWELVE(1200),
    THIRTEEN(1300),
    FOURTEEN(1400),
    FIFTEEN(1500),
    SIXTEEN(1600),
    SEVENTEEN(1700),
    EIGHTEEN(1800),
    NINETEEN(1900),
    TWENTY(2000),
    TWENTY_ONE(2100),
    TWENTY_TWO(2200),
    TWENTY_THREE(2300);

    private static final int UNIT = 100;
    private static final List<RequestPeriod> periods = Arrays.stream(values())
            .sorted(Comparator.comparingInt(RequestPeriod::getSection).reversed())
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

    public boolean isSameSection(int section) {
        return this.section == section;
    }
}
