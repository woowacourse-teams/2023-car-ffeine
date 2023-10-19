package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.domain.station.Grid;
import com.carffeine.carffeine.station.domain.station.Point;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

public record GridWithCount(
        String id,
        BigDecimal latitude,
        BigDecimal longitude,
        int count
) {

    public static GridWithCount createCenterPoint(Grid grid, int count) {
        BigDecimal centerLatitude = grid.getTop().getLatitude().add(grid.getBottom().getLatitude()).divide(BigDecimal.valueOf(2), 4, RoundingMode.CEILING);
        BigDecimal centerLongitude = grid.getTop().getLongitude().add(grid.getBottom().getLongitude()).divide(BigDecimal.valueOf(2), 4, RoundingMode.CEILING);
        return new GridWithCount(grid.getId(), centerLatitude, centerLongitude, count);
    }

    public static GridWithCount creatRandomPoint(Grid grid, int count, Point point) {
        if (Objects.isNull(point)) {
            return createCenterPoint(grid, count);
        }
        return new GridWithCount(grid.getId(), point.getLatitude().getValue(), point.getLongitude().getValue(), count);
    }
}
