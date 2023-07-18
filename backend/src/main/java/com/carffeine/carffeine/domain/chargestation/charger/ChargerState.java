package com.carffeine.carffeine.domain.chargestation.charger;

import java.util.Arrays;

public enum ChargerState {

    COMMUNICATION_ERROR(1, "1"),
    STANDBY(2, "2"),
    CHARGING_IN_PROGRESS(3, "3"),
    OPERATION_SUSPENDED(4, "4"),
    UNDER_INSPECTION(5, "5"),
    STATUS_UNKNOWN(9, "9");

    private final int value;
    private final String valueString;

    ChargerState(int value, String valueString) {
        this.value = value;
        this.valueString = valueString;
    }

    public static ChargerState from(int input) {
        return Arrays.stream(ChargerState.values())
                .filter(it -> it.value == input)
                .findAny()
                .orElse(STATUS_UNKNOWN);
    }

    public static ChargerState from(String input) {
        return Arrays.stream(ChargerState.values())
                .filter(it -> it.valueString.equals(input))
                .findAny()
                .orElse(STATUS_UNKNOWN);
    }

    public boolean isStandBy() {
        return this == STANDBY;
    }
}
