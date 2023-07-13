package com.carffeine.carffeine.domain.chargerStation.charger;

import java.util.Arrays;

public enum ChargerState {

    COMMUNICATION_ERROR(1),
    STANDBY(2),
    CHARGING_IN_PROGRESS(3),
    OPERATION_SUSPENDED(4),
    UNDER_INSPECTION(5),
    STATUS_UNKNOWN(9);

    private final int value;

    ChargerState(int value) {
        this.value = value;
    }

    public static ChargerState from(int input) {
        return Arrays.stream(ChargerState.values())
                .filter(it -> it.value == input)
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
