package com.carffeine.carffeine.station.domain.congestion;

import com.carffeine.carffeine.station.exception.congestion.CongestionException;
import lombok.Getter;

import java.time.DayOfWeek;
import java.util.Arrays;

import static com.carffeine.carffeine.station.exception.congestion.CongestionExceptionType.INVALID_DAY_OF_WEEK;

@Getter
public enum DayConverter {

    MONDAY("monday", DayOfWeek.MONDAY),
    TUESDAY("tuesday", DayOfWeek.TUESDAY),
    WEDNESDAY("wednesday", DayOfWeek.WEDNESDAY),
    THURSDAY("thursday", DayOfWeek.THURSDAY),
    FRIDAY("friday", DayOfWeek.FRIDAY),
    SATURDAY("saturday", DayOfWeek.SATURDAY),
    SUNDAY("sunday", DayOfWeek.SUNDAY);

    private final String day;
    private final DayOfWeek value;

    DayConverter(String day, DayOfWeek value) {
        this.day = day;
        this.value = value;
    }

    public static DayOfWeek from(String day) {
        return Arrays.stream(values())
                .filter(it -> it.day.equals(day))
                .findAny()
                .orElseThrow(() -> new CongestionException(INVALID_DAY_OF_WEEK))
                .getValue();
    }
}
