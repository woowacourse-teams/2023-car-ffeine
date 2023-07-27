package com.carffeine.carffeine.station.domain.station;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class Coordinate {

    private final Latitude minLatitude;
    private final Latitude maxLatitude;
    private final Longitude minLongitude;
    private final Longitude maxLongitude;

    public static Coordinate from(BigDecimal latitude,
                                  BigDecimal latitudeDelta,
                                  BigDecimal longitude,
                                  BigDecimal longitudeDelta) {
        Latitude originLatitude = Latitude.from(latitude);
        Latitude minLatitude = originLatitude.calculateMinLatitudeByDelta(latitudeDelta);
        Latitude maxLatitude = originLatitude.calculateMaxLatitudeByDelta(latitudeDelta);

        Longitude originLongitude = Longitude.from(longitude);
        Longitude minLongitude = originLongitude.calculateMinLongitudeByDelta(longitudeDelta);
        Longitude maxLongitude = originLongitude.calculateMaxLongitudeByDelta(longitudeDelta);

        return new Coordinate(minLatitude, maxLatitude, minLongitude, maxLongitude);
    }

    public BigDecimal getMinLatitudeValue() {
        return minLatitude.getValue();
    }

    public BigDecimal getMaxLatitudeValue() {
        return maxLatitude.getValue();
    }

    public BigDecimal getMinLongitudeValue() {
        return minLongitude.getValue();
    }

    public BigDecimal getMaxLongitudeValue() {
        return maxLongitude.getValue();
    }
}
