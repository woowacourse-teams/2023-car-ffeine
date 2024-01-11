package com.carffeine.carffeine.station.service;

import com.carffeine.carffeine.station.domain.Coordinate;
import com.carffeine.carffeine.station.domain.Grid;
import com.carffeine.carffeine.station.domain.GridGenerator;
import com.carffeine.carffeine.station.domain.Point;
import com.carffeine.carffeine.station.infrastructure.dto.StationPoint;
import com.carffeine.carffeine.station.service.dto.ClusterRequest;
import com.carffeine.carffeine.station.service.dto.GridWithCount;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class StationGridService {

    public List<Grid> assignStationGrids(List<Grid> grids, List<StationPoint> stations) {
        for (Grid grid : grids) {
            for (StationPoint station : stations) {
                addPointToGrid(grid, station);
            }
        }
        return grids;
    }

    private void addPointToGrid(Grid grid, StationPoint station) {
        Point point = Point.of(station.latitude(), station.longitude());
        if (grid.isContain(point)) {
            grid.addPoint(point);
        }
    }

    public List<Grid> assignStationGridsWithCount(List<GridWithCount> gridWithCounts, ClusterRequest request) {
        List<Grid> grids = createDisplayGrid(request);
        for (Grid grid : grids) {
            for (GridWithCount gridWithCount : gridWithCounts) {
                addCountToGrid(grid, gridWithCount);
            }
        }
        return grids;
    }

    private List<Grid> createDisplayGrid(ClusterRequest request) {
        GridGenerator gridGenerator = new GridGenerator();
        Coordinate coordinate = Coordinate.of(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());
        BigDecimal maxLatitude = coordinate.maxLatitudeValue();
        BigDecimal minLongitude = coordinate.minLongitudeValue();
        BigDecimal minLatitude = coordinate.minLatitudeValue();
        BigDecimal maxLongitude = coordinate.maxLongitudeValue();
        return gridGenerator.create(Point.of(maxLatitude, minLongitude), Point.of(minLatitude, maxLongitude), request.latitudeDivisionSize(), request.longitudeDivisionSize());
    }

    private void addCountToGrid(Grid grid, GridWithCount gridWithCount) {
        Point point = Point.of(gridWithCount.latitude(), gridWithCount.longitude());
        if (grid.isContain(point)) {
            grid.addCount(gridWithCount.count());
        }
    }
}
