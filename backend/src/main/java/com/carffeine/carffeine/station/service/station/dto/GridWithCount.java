package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.domain.station.Grid;
import com.carffeine.carffeine.station.domain.station.Point;

import java.math.BigDecimal;

public record GridWithCount(
        String id,
        BigDecimal latitude,
        BigDecimal longitude,
        int count
) {

    public static GridWithCount createCenterPoint(Grid grid, int count) {
        BigDecimal centerLatitude = grid.calculateCenterLatitude();
        BigDecimal centerLongitude = grid.calculateCenterLongitude();
        return new GridWithCount(grid.getId(), centerLatitude, centerLongitude, count);
    }

    public static GridWithCount createRandom(Grid grid, int count, Point point) {
        return new GridWithCount(grid.getId(), point.getLatitude().getValue(), point.getLongitude().getValue(), count);
    }
}
