package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.domain.station.Grid;

import java.math.BigDecimal;
import java.math.RoundingMode;

public record GridWithCount(
        BigDecimal latitude,
        BigDecimal longitude,
        int count
) {

    public static GridWithCount createCenterPoint(Grid grid) {
        BigDecimal centerLatitude = grid.getTop().getLatitude().add(grid.getBottom().getLatitude()).divide(BigDecimal.valueOf(2), 4, RoundingMode.CEILING);
        BigDecimal centerLongitude = grid.getTop().getLongitude().add(grid.getBottom().getLongitude()).divide(BigDecimal.valueOf(2), 4, RoundingMode.CEILING);
        return new GridWithCount(centerLatitude, centerLongitude, grid.stationSize());
    }
}
