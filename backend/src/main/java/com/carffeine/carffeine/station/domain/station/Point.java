package com.carffeine.carffeine.station.domain.station;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;

@ToString
@Getter
@AllArgsConstructor
public class Point {

    private final Latitude latitude;
    private final Longitude longitude;

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
