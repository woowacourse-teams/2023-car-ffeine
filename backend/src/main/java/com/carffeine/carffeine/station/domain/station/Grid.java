package com.carffeine.carffeine.station.domain.station;

import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ToString
@Getter
public class Grid {

    private final Point top;
    private final Point bottom;
    private final List<Point> points;
    private String id;
    private int count;

    public Grid(Point top, Point bottom) {
        this.id = UUID.randomUUID().toString();
        this.top = top;
        this.bottom = bottom;
        this.points = new ArrayList<>();
    }

    public boolean isContain(Point point) {
        Latitude topLatitude = top.getLatitude();
        Latitude bottomLatitude = bottom.getLatitude();
        Latitude pointLatitude = point.getLatitude();
        Longitude topLongitude = top.getLongitude();
        Longitude bottomLongitude = bottom.getLongitude();
        Longitude pointLongitude = point.getLongitude();

        if (topLatitude.isHigher(bottomLatitude) && (pointLatitude.isBetween(topLatitude, bottomLatitude))) {
            return pointLongitude.isBetween(topLongitude, bottomLongitude);
        }
        return pointLongitude.isBetween(bottomLongitude, topLongitude);
    }

    public void addPoint(Point point) {
        points.add(point);
    }

    public int stationSize() {
        return points.size();
    }

    public boolean hasStation() {
        return !points.isEmpty();
    }

    public boolean existsCount() {
        return count > 0;
    }

    public void addCount(int count) {
        this.count += count;
    }
}
