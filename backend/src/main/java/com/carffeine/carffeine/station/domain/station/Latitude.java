package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "value")
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
            throw new StationException(StationExceptionType.INVALID_LATITUDE);
        }
    }

    public Latitude calculateMinLatitudeByDelta(BigDecimal delta) {
        return new Latitude(value.subtract(delta));
    }

    public Latitude calculateMaxLatitudeByDelta(BigDecimal delta) {
        return new Latitude(value.add(delta));
    }
}
