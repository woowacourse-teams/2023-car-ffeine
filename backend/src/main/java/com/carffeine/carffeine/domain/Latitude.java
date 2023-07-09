package com.carffeine.carffeine.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Latitude {

    private static final BigDecimal KOREA_MIN_LATITUDE = BigDecimal.valueOf(33);
    private static final BigDecimal KOREA_MAX_LATITUDE = BigDecimal.valueOf(39);

    @Column(name = "latitude", scale = 7, precision = 13)
    private BigDecimal value;

    private Latitude(BigDecimal value) {
        validateKoreaLatitude(value);
        this.value = value;
    }

    public static Latitude from(String value) {
        return new Latitude(new BigDecimal(value));
    }

    public static Latitude from(BigDecimal value) {
        return new Latitude(value);
    }

    private void validateKoreaLatitude(BigDecimal value) {
        if (value.compareTo(KOREA_MIN_LATITUDE) < 0 || value.compareTo(KOREA_MAX_LATITUDE) > 0) {
            throw new ChargeStationException(ChargeStationExceptionType.INVALID_LATITUDE);
        }
    }

    public Latitude minLatitude(BigDecimal deltaX) {
        return new Latitude(value.subtract(deltaX));
    }

    public Latitude maxLatitude(BigDecimal deltaX) {
        return new Latitude(value.add(deltaX));
    }
}

