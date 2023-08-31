package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusRepository;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.service.station.dto.StationSearchResponse;
import com.carffeine.carffeine.station.service.station.dto.StationsSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class StationService {

    private static final String QUICK = "QUICK";
    private static final String STANDARD = "STANDARD";

    private final StationRepository stationRepository;
    private final ChargerStatusRepository chargerStatusRepository;
    private final PeriodicCongestionCustomRepository periodicCongestionCustomRepository;

    @Transactional
    @Scheduled(cron = "* * 0/1 * * *")
    public void calculateCongestion() {
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        RequestPeriod period = RequestPeriod.from(now.getHour());
        List<ChargerStatus> chargerStatuses = chargerStatusRepository.findAll();
        List<PeriodicCongestion> congestions = chargerStatuses.stream()
                .map(it -> PeriodicCongestion.of(dayOfWeek, period, 0, 0, it.getStationId(), it.getChargerId()))
                .toList();
        List<ChargerStatus> usingChargers = chargerStatuses.stream()
                .filter(ChargerStatus::isUsing)
                .toList();
        periodicCongestionCustomRepository.saveAll(congestions);
        periodicCongestionCustomRepository.updateUsingCount(dayOfWeek, period, usingChargers);
        periodicCongestionCustomRepository.updateTotalCountByPeriod(dayOfWeek, period);
    }

    @Transactional(readOnly = true)
    public StationsSearchResponse searchStations(String query, Set<String> scope, int page, int limit) {
        List<Station> stations = stationRepository.findAllByStationNameContainingOrAddressContainingOrderByStationId(query, query);
        List<StationSearchResponse> stationByScope = stationsToScope(stations, scope, page, limit);
        return new StationsSearchResponse(
                stations.size(),
                stationByScope
        );
    }

    private List<StationSearchResponse> stationsToScope(List<Station> stations, Set<String> scope, int page, int limit) {
        return stations.stream()
                .skip((long) (page - 1) * limit)
                .limit(limit)
                .map(station -> stationToScope(station, scope))
                .toList();
    }

    private StationSearchResponse stationToScope(Station station, Set<String> scope) {
        StationSearchResponse.StationSearchResponseBuilder builder = StationSearchResponse.builder();
        if (scope.contains("stationName")) {
            builder.stationName(station.getStationName());
        }
        if (scope.contains("address")) {
            builder.address(station.getAddress());
        }
        if (scope.contains("latitude")) {
            builder.latitude(station.getLatitude().getValue());
        }
        if (scope.contains("longitude")) {
            builder.longitude(station.getLongitude().getValue());
        }
        if (scope.contains("speed")) {
            List<Charger> chargers = station.getChargers();
            ArrayList<String> speed = new ArrayList<>();
            if (hasQuickCharger(chargers)) {
                speed.add(QUICK);
            }
            if (hasStandardCharger(chargers)) {
                speed.add(STANDARD);
            }
            builder.speed(speed);
        }
        builder.stationId(station.getStationId());
        return builder.build();
    }

    private boolean hasQuickCharger(List<Charger> chargers) {
        return chargers.stream()
                .anyMatch(Charger::isQuick);
    }

    private boolean hasStandardCharger(List<Charger> chargers) {
        return chargers.stream()
                .anyMatch(it -> !it.isQuick());
    }
}
