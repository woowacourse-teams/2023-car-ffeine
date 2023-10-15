package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.station.Grid;
import com.carffeine.carffeine.station.domain.station.Point;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationPoint;
import com.carffeine.carffeine.station.service.station.dto.GridWithCount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StationGridService {

    public List<Grid> assignStationGrids(List<Grid> grids, List<StationPoint> stations) {
        for (Grid grid : grids) {
            for (StationPoint station : stations) {
                Point point = Point.of(station.latitude(), station.longitude());
                if (grid.isContain(point)) {
                    grid.addPoint(point);
                }
            }
        }
        return grids;
    }

    public List<Grid> assignStationGridsWithCount(List<Grid> grids, List<GridWithCount> gridWithCounts) {
        for (Grid grid : grids) {
            for (GridWithCount gridWithCount : gridWithCounts) {
                Point point = Point.of(gridWithCount.latitude(), gridWithCount.longitude());
                if (grid.isContain(point)) {
                    grid.addCount(gridWithCount.count());
                }
            }
        }
        return grids;
    }

}
