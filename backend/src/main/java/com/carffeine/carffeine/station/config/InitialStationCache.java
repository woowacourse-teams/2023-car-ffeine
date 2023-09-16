package com.carffeine.carffeine.station.config;

import com.carffeine.carffeine.station.infrastructure.repository.station.StationCacheRepository;
import com.carffeine.carffeine.station.infrastructure.repository.station.StationQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class InitialStationCache implements ApplicationRunner {

    private final StationCacheRepository stationCacheRepository;
    private final StationQueryRepository stationQueryRepository;

    @Override
    public void run(ApplicationArguments args) {
        log.info("Initialize station cache");
        List<StationInfo> stations = stationQueryRepository.findAll();
        stationCacheRepository.initialize(stations);
        log.info("Station cache initialized");
        log.info("Station cache size: {}", stations.size());
    }
}
