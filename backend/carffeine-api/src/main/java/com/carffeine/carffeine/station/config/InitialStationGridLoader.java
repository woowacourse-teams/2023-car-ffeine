package com.carffeine.carffeine.station.config;

import com.carffeine.carffeine.station.service.StationGridCacheService;
import com.carffeine.carffeine.station.service.StationGridFacadeService;
import com.carffeine.carffeine.station.service.dto.GridWithCount;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class InitialStationGridLoader implements ApplicationRunner {

    private final StationGridFacadeService stationGridFacadeService;
    private final StationGridCacheService stationGridCacheService;

    @Override
    public void run(ApplicationArguments args) {
        log.info("initialize station grid");
        List<GridWithCount> gridWithCounts = stationGridFacadeService.createGridWithCounts();
        stationGridCacheService.initialize(gridWithCounts);
        log.info("cache size : {}", gridWithCounts.size());
    }
}
