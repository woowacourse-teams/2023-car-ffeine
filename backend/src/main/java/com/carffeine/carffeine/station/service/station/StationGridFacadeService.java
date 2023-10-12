package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.station.Grid;
import com.carffeine.carffeine.station.domain.station.GridGenerator;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationPoint;
import com.carffeine.carffeine.station.service.station.dto.GridWithCount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StationGridFacadeService {

    private final StationGridService stationGridService;
    private final StationQueryService stationQueryService;

    public List<GridWithCount> createGridWithCounts() {
        GridGenerator gridGenerator = new GridGenerator();
        List<Grid> grids = gridGenerator.createKorea();
        int size = 1000;
        int page = 0;
        while (size == 1000) {
            List<StationPoint> stationPoint = stationQueryService.findStationPoint(page, size);
            stationGridService.assignStationGrids(grids, stationPoint);
            page++;
            size = stationPoint.size();
        }
        return grids.stream()
                .map(GridWithCount::createCenterPoint)
                .toList();
    }
}
