package com.carffeine.carffeine.domain.chargestation.charger;

import java.math.BigDecimal;
import java.util.Arrays;

public enum ChargerType {

    DC_FAST("01", BigDecimal.valueOf(100)),
    AC_SLOW("02", BigDecimal.valueOf(7)),
    DC_AC_3PHASE("03", BigDecimal.valueOf(100)),
    DC_COMBO("04", BigDecimal.valueOf(100)),
    DC_DC_COMBO("05", BigDecimal.valueOf(50)),
    DC_AC_DC_COMBO("06", BigDecimal.valueOf(50)),
    AC_3PHASE("07", BigDecimal.valueOf(7)),
    ;

    private final String typeNumber;
    private final BigDecimal defaultCapacity;

    ChargerType(String typeNumber, BigDecimal defaultCapacity) {
        this.typeNumber = typeNumber;
        this.defaultCapacity = defaultCapacity;
    }

    public static ChargerType from(String input) {
        return Arrays.stream(values())
                .filter(it -> it.typeNumber.equals(input))
                .findFirst()
                .orElse(AC_SLOW);
    }

    public BigDecimal getDefaultCapacity() {
        return defaultCapacity;
    }
}
