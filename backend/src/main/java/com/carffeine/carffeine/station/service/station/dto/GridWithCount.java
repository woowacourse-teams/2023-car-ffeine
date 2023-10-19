package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.domain.station.Grid;

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
}
