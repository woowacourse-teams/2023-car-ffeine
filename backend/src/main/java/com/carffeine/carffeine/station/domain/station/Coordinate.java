package com.carffeine.carffeine.station.domain.station;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class Coordinate {

    private final Latitude minLatitude;
    private final Latitude maxLatitude;
    private final Longitude minLongitude;
    private final Longitude maxLongitude;

    private Coordinate(Latitude minLatitude,
                       Latitude maxLatitude,
                       Longitude minLongitude,
                       Longitude maxLongitude) {
        this.minLatitude = minLatitude;
        this.maxLatitude = maxLatitude;
        this.minLongitude = minLongitude;
        this.maxLongitude = maxLongitude;
    }

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
}
