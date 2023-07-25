package com.carffeine.carffeine.station.domain.station;

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
public class Longitude {

    private static final BigDecimal KOREA_MIN_LONGITUDE = BigDecimal.valueOf(125);
    private static final BigDecimal KOREA_MAX_LONGITUDE = BigDecimal.valueOf(132);

    @Column(name = "longitude", scale = 7, precision = 13)
    private BigDecimal value;

    private Longitude(BigDecimal value) {
        validateKoreaLongitude(value);
        this.value = value;
    }

    public static Longitude from(String value) {
        return new Longitude(new BigDecimal(value));
    }

    public static Longitude from(BigDecimal value) {
        return new Longitude(value);
    }

    private void validateKoreaLongitude(BigDecimal value) {
//        if (value.compareTo(KOREA_MIN_LONGITUDE) < 0 || value.compareTo(KOREA_MAX_LONGITUDE) > 0) {
//            throw new ChargeStationException(ChargeStationExceptionType.INVALID_LONGITUDE);
//        }
    }

    public Longitude calculateMinLongitudeByDelta(BigDecimal delta) {
        return new Longitude(value.subtract(delta));
    }

    public Longitude calculateMaxLongitudeByDelta(BigDecimal delta) {
        return new Longitude(value.add(delta));
    }
}
