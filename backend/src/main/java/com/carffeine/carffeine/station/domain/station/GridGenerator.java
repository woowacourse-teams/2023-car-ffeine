package com.carffeine.carffeine.station.domain.station;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

public class GridGenerator {

    public List<Grid> create(Point top, Point bottom, int latitudeDivisionSize, int longitudeDivisionSize) {

        List<Grid> grids = new ArrayList<>();
        List<Latitude> latitudes = divideLatitude(top, bottom, latitudeDivisionSize);
        List<Longitude> longitudes = divideLongitude(top, bottom, longitudeDivisionSize);
        BigDecimal latInterval = getLatInterval(top, bottom, latitudeDivisionSize);
        BigDecimal longInterval = getLongInterval(top, bottom, longitudeDivisionSize);
        for (Latitude latitude : latitudes) {
            for (Longitude longitude : longitudes) {
                Point topPoint = Point.of(latitude.getValue(), longitude.getValue());
                Point bottomPoint = Point.of(latitude.getValue().add(latInterval), longitude.getValue().add(longInterval));
                grids.add(new Grid(topPoint, bottomPoint));
            }
        }
        return grids;
    }

    private BigDecimal getLongInterval(Point top, Point bottom, int divisionSize) {
        Longitude topLongitude = top.getLongitude();
        Longitude bottomLongitude = bottom.getLongitude();
        BigDecimal length = topLongitude.subtract(bottomLongitude);
        return length.divide(BigDecimal.valueOf(divisionSize), 4, RoundingMode.HALF_EVEN);
    }

    private BigDecimal getLatInterval(Point top, Point bottom, int divisionSize) {
        Latitude topLatitude = top.getLatitude();
        Latitude bottomLatitude = bottom.getLatitude();
        BigDecimal length = topLatitude.subtract(bottomLatitude);
        return length.divide(BigDecimal.valueOf(divisionSize), 4, RoundingMode.HALF_EVEN);
    }

    private List<Longitude> divideLongitude(Point top, Point bottom, int divisionSize) {
        Longitude topLongitude = top.getLongitude();
        Longitude bottomLongitude = bottom.getLongitude();
        BigDecimal length = topLongitude.subtract(bottomLongitude);
        BigDecimal interval = length.divide(BigDecimal.valueOf(divisionSize), 4, RoundingMode.HALF_EVEN);
        return IntStream.range(0, divisionSize)
                .mapToObj(index -> calculateGridLongitude(index, bottomLongitude, interval))
                .toList();
    }

    private Longitude calculateGridLongitude(int index, Longitude longitude, BigDecimal interval) {
        BigDecimal distance = interval.multiply(new BigDecimal(index));
        return Longitude.from(longitude.getValue().add(distance));

    }

    private List<Latitude> divideLatitude(Point top, Point bottom, int divisionSize) {
        Latitude topLatitude = top.getLatitude();
        Latitude bottomLatitude = bottom.getLatitude();
        BigDecimal length = topLatitude.subtract(bottomLatitude);
        BigDecimal interval = length.divide(BigDecimal.valueOf(divisionSize), 4, RoundingMode.HALF_EVEN);
        return IntStream.range(0, divisionSize)
                .mapToObj(index -> calculateGridLatitude(index, bottomLatitude, interval))
                .toList();
    }

    private Latitude calculateGridLatitude(int index, Latitude latitude, BigDecimal interval) {
        BigDecimal distance = interval.multiply(new BigDecimal(index));
        return Latitude.from(latitude.getValue().add(distance));
    }
}
