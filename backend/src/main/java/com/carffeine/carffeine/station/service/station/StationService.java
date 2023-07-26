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
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class StationService {

    private final StationRepository stationRepository;
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerStatusRepository chargerStatusRepository;

    @Transactional(readOnly = true)
    public List<Station> findByCoordinate(CoordinateRequest request, List<String> companyNames, List<ChargerType> chargerTypes, List<BigDecimal> capacities) {
        Coordinate coordinate = Coordinate.from(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());

        List<Station> stations = stationRepository.findAllByLatitudeBetweenAndLongitudeBetween(coordinate.getMinLatitude(), coordinate.getMaxLatitude(), coordinate.getMinLongitude(), coordinate.getMaxLongitude());
        List<Station> filteredStations = new ArrayList<>(stations);

        filterByCompanyNames(filteredStations, companyNames);
        filterByChargerTypes(filteredStations, chargerTypes);
        filterByCapacities(filteredStations, capacities);
        removeStationsWithEmptyChargers(filteredStations);

        return filteredStations;
    }

    private void filterByCompanyNames(List<Station> stations, List<String> companyNames) {
        if (!companyNames.isEmpty()) {
            stations.removeIf(station -> !companyNames.contains(station.getCompanyName()));
        }
    }

    private void filterByChargerTypes(List<Station> stations, List<ChargerType> chargerTypes) {
        if (!chargerTypes.isEmpty()) {
            stations.removeIf(station -> station
                    .getChargers()
                    .stream()
                    .noneMatch(charger -> chargerTypes.contains(charger.getType()))
            );
        }
    }

    private void filterByCapacities(List<Station> stations, List<BigDecimal> capacities) {
        if (!capacities.isEmpty()) {
            stations.removeIf(station -> station
                    .getChargers()
                    .stream()
                    .noneMatch(charger -> capacities.contains(charger.getCapacity()))
            );
        }
    }

    private void removeStationsWithEmptyChargers(List<Station> stations) {
        stations.removeIf(station -> station.getChargers().isEmpty());
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
}
