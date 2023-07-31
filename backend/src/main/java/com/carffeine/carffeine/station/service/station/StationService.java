package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusRepository;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.congestion.IdGenerator;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import com.carffeine.carffeine.station.domain.station.Coordinate;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.domain.station.Stations;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import com.carffeine.carffeine.station.service.station.dto.StationSearchResponse;
import com.carffeine.carffeine.station.service.station.dto.StationsSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class StationService {

    private static final int PAGE_SIZE = 6;

    private final StationRepository stationRepository;
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerStatusRepository chargerStatusRepository;

    @Transactional(readOnly = true)
    public List<Station> findByCoordinate(CoordinateRequest request, List<String> companyNames, List<ChargerType> chargerTypes, List<BigDecimal> capacities) {
        Coordinate coordinate = Coordinate.of(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());

        List<Station> stationsByCoordinate = stationRepository.findAllFetchByLatitudeBetweenAndLongitudeBetween(coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue());
        Stations stations = Stations.from(stationsByCoordinate);

        return stations.findFilteredStations(companyNames, chargerTypes, capacities);
    }

    @Transactional(readOnly = true)
    public Station findStationById(String stationId) {
        return stationRepository.findChargeStationByStationId(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }

    @Scheduled(cron = "* * 0/1 * * *")
    public void calculateCongestion() {
        LocalDateTime now = LocalDateTime.now();

        DayOfWeek dayOfWeek = now.getDayOfWeek();

        RequestPeriod period = RequestPeriod.from(now.getHour());

        List<PeriodicCongestion> congestions = periodicCongestionRepository.findAllByDayOfWeekAndStartTime(dayOfWeek, period);
        Map<String, PeriodicCongestion> map = new HashMap<>();
        for (PeriodicCongestion congestion : congestions) {
            String id = congestion.getId();
            map.put(id, congestion);
        }
        List<ChargerStatus> chargerStatuses = chargerStatusRepository.findAll();

        for (ChargerStatus chargerStatus : chargerStatuses) {
            String expectedId = IdGenerator.generateId(dayOfWeek, period, chargerStatus.getStationId(), chargerStatus.getChargerId());
            if (!map.containsKey(expectedId)) {
                int useCount = updateCount(chargerStatus, 0);
                periodicCongestionRepository.save(PeriodicCongestion.of(dayOfWeek, period, useCount, 1, chargerStatus.getStationId(), chargerStatus.getChargerId()));
                continue;
            }

            int useCount = updateCount(chargerStatus, map.get(expectedId).getUseCount());
            int totalCount = map.get(expectedId).getTotalCount() + 1;
            periodicCongestionRepository.save(PeriodicCongestion.of(dayOfWeek, period, useCount, totalCount, chargerStatus.getStationId(), chargerStatus.getChargerId()));
        }
    }

    private int updateCount(ChargerStatus item, int status) {
        if (item.getChargerCondition() == ChargerCondition.CHARGING_IN_PROGRESS) {
            return status + 1;
        }
        return status;
    }

    public StationsSearchResponse searchStations(String query, Set<String> scope, int page) {
        List<Station> stations = stationRepository.findAllByStationNameContainingOrAddressContainingOrderByStationId(query, query);
        List<StationSearchResponse> stationByScope = stationsToScope(stations, scope, page);
        return new StationsSearchResponse(
                stations.size(),
                stationByScope
        );
    }

    private List<StationSearchResponse> stationsToScope(List<Station> stations, Set<String> scope, int page) {
        return stations.stream()
                .skip((page - 1) * PAGE_SIZE)
                .limit(PAGE_SIZE)
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
        builder.stationId(station.getStationId());
        return builder.build();
    }
}
