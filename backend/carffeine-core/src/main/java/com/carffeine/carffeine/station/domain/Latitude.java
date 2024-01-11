package com.carffeine.carffeine.station.domain;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.math.BigDecimal;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "value")
@Embeddable
public class Latitude {

    private static final BigDecimal KOREA_MIN_LATITUDE = BigDecimal.valueOf(33);
    private static final BigDecimal KOREA_MAX_LATITUDE = BigDecimal.valueOf(39);

    @Column(name = "latitude", scale = 7, precision = 13, nullable = false)
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
//            throw new StationException(StationExceptionType.INVALID_LATITUDE);
        }
    }

    public Latitude calculateMinLatitudeByDelta(BigDecimal delta) {
        return new Latitude(value.subtract(delta));
    }

    public Latitude calculateMaxLatitudeByDelta(BigDecimal delta) {
        return new Latitude(value.add(delta));
    }

    public BigDecimal subtract(Latitude other) {
        return value.subtract(other.value);
    }

    public boolean isHigher(Latitude other) {
        return this.value.compareTo(other.value) > 0;
    }

    public boolean isBetween(Latitude top, Latitude bottom) {
        return this.value.compareTo(top.value) <= 0 && this.value.compareTo(bottom.value) >= 0;
    }

    public BigDecimal add(Latitude other) {
        return this.value.add(other.value);
    }
}
