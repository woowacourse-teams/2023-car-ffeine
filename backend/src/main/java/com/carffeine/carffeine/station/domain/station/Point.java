package com.carffeine.carffeine.station.domain.station;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class Point {

    private Latitude latitude;
    private Longitude longitude;

    public static Point of(long latitude, long longitude) {
        return new Point(Latitude.from(BigDecimal.valueOf(latitude)), Longitude.from(BigDecimal.valueOf(longitude)));
    }

    public static Point of(double latitude, double longitude) {
        return new Point(Latitude.from(BigDecimal.valueOf(latitude)), Longitude.from(BigDecimal.valueOf(longitude)));
    }

    public static Point of(BigDecimal latitude, BigDecimal longitude) {
        return new Point(Latitude.from(latitude), Longitude.from(longitude));
    }
}
