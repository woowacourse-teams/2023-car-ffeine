package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.station.Coordinate;
import com.carffeine.carffeine.station.domain.station.Grid;
import com.carffeine.carffeine.station.domain.station.GridGenerator;
import com.carffeine.carffeine.station.domain.station.Point;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationPoint;
import com.carffeine.carffeine.station.service.station.dto.ClusterRequest;
import com.carffeine.carffeine.station.service.station.dto.GridWithCount;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@RequiredArgsConstructor
@Service
public class StationGridFacadeService {

    private final StationGridService stationGridService;
    private final StationQueryService stationQueryService;
    private final StationGridCacheService stationGridCacheService;
    private final ExecutorService executor = Executors.newFixedThreadPool(5);

    private static List<GridWithCount> createCenterPointWhereHasStation(List<Grid> grids) {
        return grids.stream()
                .filter(Grid::hasStation)
                .map(it -> GridWithCount.createCenterPoint(it, it.stationSize()))
                .toList();
    }

    public List<GridWithCount> createGridWithCounts() {
        GridGenerator gridGenerator = new GridGenerator();
        List<Grid> grids = gridGenerator.createKorea();
        List<CompletableFuture<Void>> futures = new ArrayList<>();

        int size = 1000;
        int page = 0;
        while (size == 1000) {
            int finalPage = page;
            List<StationPoint> stationPoints = stationQueryService.findStationPoint(finalPage, size);
            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> stationGridService.assignStationGrids(grids, stationPoints), executor);

            futures.add(future);
            page++;
            size = stationPoints.size();
        }
        futures.forEach(CompletableFuture::join);
        executor.shutdown();

        List<GridWithCount> list = createCenterPointWhereHasStation(grids);
        return new ArrayList<>(list);
    }

    public List<GridWithCount> counts(ClusterRequest request) {
        List<GridWithCount> gridWithCounts = stationGridCacheService.findGrids(request);
        List<Grid> displayGrid = createDisplayGrid(request);
        List<Grid> grids = stationGridService.assignStationGridsWithCount(displayGrid, gridWithCounts);
        List<GridWithCount> list = grids.stream()
                .filter(Grid::existsCount)
                .map(it -> GridWithCount.createCenterPoint(it, it.getCount()))
                .toList();
        return new ArrayList<>(list);
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
}
