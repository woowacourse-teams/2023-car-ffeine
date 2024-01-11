package com.carffeine.carffeine.station.service;

import com.carffeine.carffeine.station.domain.Station;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class StationPeriodicUpdateService {

    private final StationUpdateService stationUpdateService;
    private final StationRequester stationRequester;

    @Scheduled(cron = "0 0 2 * * ?")
    public void updatePeriodicStations() {
        List<Station> stations = IntStream.rangeClosed(1, 24)
                .mapToObj(it -> stationRequester.requestChargeStationRequest(it).toStations())
                .flatMap(List::stream)
                .toList();
        stationUpdateService.updateStations(stations);
    }
}
