package com.carffeine.carffeine.station.domain.station;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class Grid {

    private Point top;
    private Point bottom;

    public Grid(Point top, Point bottom) {
        this.top = top;
        this.bottom = bottom;
    }
}
