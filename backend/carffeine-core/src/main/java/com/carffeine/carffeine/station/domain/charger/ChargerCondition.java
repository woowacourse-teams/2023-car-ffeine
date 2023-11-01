package com.carffeine.carffeine.station.domain.charger;

import java.util.Arrays;

public enum ChargerCondition {

    COMMUNICATION_ERROR(1),
    STANDBY(2),
    CHARGING_IN_PROGRESS(3),
    OPERATION_SUSPENDED(4),
    UNDER_INSPECTION(5),
    STATUS_UNKNOWN(9);

    private final int value;

    ChargerCondition(int value) {
        this.value = value;
    }

    public static ChargerCondition from(int input) {
        return Arrays.stream(ChargerCondition.values())
                .filter(it -> it.value == input)
                .findAny()
                .orElse(STATUS_UNKNOWN);
    }

    public static ChargerCondition from(String input) {
        return Arrays.stream(ChargerCondition.values())
                .filter(it -> it.value == input.charAt(0) - '0')
                .findAny()
                .orElse(STATUS_UNKNOWN);
    }

    public boolean isStandBy() {
        return this == STANDBY;
    }

    public int getValue() {
        return value;
    }
}
