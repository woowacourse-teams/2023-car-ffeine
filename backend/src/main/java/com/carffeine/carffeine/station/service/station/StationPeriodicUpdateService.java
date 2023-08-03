package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.station.Station;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class StationPeriodicUpdateService {

    private static final int LIMIT = 10000;

    private final StationUpdateService stationUpdateService;
    private final StationRequester stationRequester;

    @Scheduled(cron = "0 0 2 * * ?")
    public void updatePeriodicStations1() {
        List<Station> stations = IntStream.rangeClosed(1, 24)
                .mapToObj(it -> stationRequester.requestChargeStationRequest(it).toStations())
                .flatMap(List::stream)
                .toList();

        String lastStationId = null;
        for (int i = 0; i < stations.size() / LIMIT + 1; i++) {
            lastStationId = stationUpdateService.updateStations(stations, lastStationId, LIMIT);
        }
    }
}
