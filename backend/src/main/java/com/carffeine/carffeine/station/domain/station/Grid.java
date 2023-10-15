package com.carffeine.carffeine.station.domain.station;

import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ToString
@Getter
public class Grid {

    private String id;
    private Point top;
    private Point bottom;
    private List<Point> points;
    private int count;

    public Grid(Point top, Point bottom) {
        this.id = UUID.randomUUID().toString();
        this.top = top;
        this.bottom = bottom;
        this.points = new ArrayList<>();
    }

    public boolean isContain(Point point) {
        if (top.getLatitude().compareTo(bottom.getLatitude()) > 0) {
            if (point.getLatitude().compareTo(top.getLatitude()) <= 0 && point.getLatitude().compareTo(bottom.getLatitude()) >= 0) {
                return point.getLongitude().compareTo(top.getLongitude()) >= 0 && point.getLongitude().compareTo(bottom.getLongitude()) <= 0;
            }
        } else {
            if (point.getLatitude().compareTo(top.getLatitude()) >= 0 && point.getLatitude().compareTo(bottom.getLatitude()) <= 0) {
                return point.getLongitude().compareTo(top.getLongitude()) <= 0 && point.getLongitude().compareTo(bottom.getLongitude()) >= 0;
            }
        }
        return false;
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
