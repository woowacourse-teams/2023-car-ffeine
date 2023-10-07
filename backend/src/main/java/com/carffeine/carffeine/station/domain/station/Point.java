package com.carffeine.carffeine.station.domain.station;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode(of = "value")
@Embeddable
public class Point {

    private Latitude latitude;
    private Longitude longitude;

    public static Point of(long latitude, long longitude) {
        return new Point(Latitude.from(BigDecimal.valueOf(latitude)), Longitude.from(BigDecimal.valueOf(longitude)));
    }
}
