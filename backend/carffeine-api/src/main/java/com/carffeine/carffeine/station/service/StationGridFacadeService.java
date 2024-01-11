package com.carffeine.carffeine.station.service;

import com.carffeine.carffeine.station.domain.Grid;
import com.carffeine.carffeine.station.domain.GridGenerator;
import com.carffeine.carffeine.station.infrastructure.dto.StationPoint;
import com.carffeine.carffeine.station.service.dto.ClusterRequest;
import com.carffeine.carffeine.station.service.dto.GridWithCount;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class StationGridFacadeService {

    private static final int CHUNK_SIZE = 1000;

    private final StationGridService stationGridService;
    private final StationQueryService stationQueryService;
    private final StationGridCacheService stationGridCacheService;

    public List<GridWithCount> createGridWithCounts() {
        GridGenerator gridGenerator = new GridGenerator();
        List<Grid> grids = gridGenerator.createKorea();
        int size = CHUNK_SIZE;
        int page = 0;
        while (size == 1000) {
            log.info("page : {}", page);
            List<StationPoint> stationPoint = stationQueryService.findStationPoint(page, size);
            stationGridService.assignStationGrids(grids, stationPoint);
            page++;
            size = stationPoint.size();
        }
        List<GridWithCount> list = grids.stream()
                .filter(Grid::hasStation)
                .map(it -> GridWithCount.createCenterPoint(it, it.stationSize()))
                .toList();
        return new ArrayList<>(list);
    }

    public List<GridWithCount> counts(ClusterRequest request) {
        List<GridWithCount> gridWithCounts = stationGridCacheService.findGrids(request);
        List<Grid> grids = stationGridService.assignStationGridsWithCount(gridWithCounts, request);
        List<GridWithCount> list = grids.stream()
                .filter(Grid::existsCount)
                .map(it -> GridWithCount.createCenterPoint(it, it.getCount()))
                .toList();
        return new ArrayList<>(list);
    }
}
