package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerStatusRepository;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
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
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
    private final PeriodicCongestionRepository periodicCongestionRepository;
    private final ChargerStatusRepository chargerStatusRepository;
    private final PeriodicCongestionCustomRepository periodicCongestionCustomRepository;

    @Transactional(readOnly = true)
    public List<Station> findByCoordinate(CoordinateRequest request,
                                          List<String> companyNames,
                                          List<ChargerType> chargerTypes,
                                          List<BigDecimal> capacities) {
        Coordinate coordinate = Coordinate.of(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());

        List<Station> stationsByCoordinate = stationRepository.findAllFetchByLatitudeBetweenAndLongitudeBetween(coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue());
        Stations stations = Stations.from(stationsByCoordinate);

        return stations.findFilteredStations(companyNames, chargerTypes, capacities);
    }


    @Transactional(readOnly = true)
    public List<Station> findByCoordinateV2(String stationId,
                                            Pageable pageable,
                                            CoordinateRequest request,
                                            List<String> companyNames,
                                            List<ChargerType> chargerTypes,
                                            List<BigDecimal> capacities) {
        Coordinate coordinate = Coordinate.of(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());

        // 1. station Id 없는 경우
        if (stationId == null) {
            if (companyNames.isEmpty() && chargerTypes.isEmpty() && capacities.isEmpty()) {
                // 필터 없는 경우
                return stationRepository.findAllByFilteringNone(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue());
            }

            if (!companyNames.isEmpty() && chargerTypes.isEmpty() && capacities.isEmpty()) {
                // 1. 회사명 필터링
                return stationRepository.findAllByFilteringBeingCompanyNames(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames);
            }

            if (companyNames.isEmpty() && !chargerTypes.isEmpty() && capacities.isEmpty()) {
                // 2. 충전 타입 필터링
                return stationRepository.findAllByFilteringBeingTypes(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), chargerTypes);
            }

            if (companyNames.isEmpty() && chargerTypes.isEmpty() && !capacities.isEmpty()) {
                // 3. 충전 속도 필터링
                return stationRepository.findAllByFilteringBeingCapacities(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), capacities);
            }

            if (!companyNames.isEmpty() && !chargerTypes.isEmpty() && capacities.isEmpty()) {
                // 4. 회사명 + 충전 타입 필터링
                return stationRepository.findAllByFilteringBeingCompanyNamesAndTypes(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames, chargerTypes);
            }

            if (!companyNames.isEmpty() && !chargerTypes.isEmpty() && capacities.isEmpty()) {
                // 5. 회사명 + 충전 속도
                return stationRepository.findAllByFilteringBeingCompanyNamesAndCapacities(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames, capacities);
            }

            if (companyNames.isEmpty() && !chargerTypes.isEmpty() && !capacities.isEmpty()) {
                // 6. 충전 타입 + 충전 속도
                return stationRepository.findAllByFilteringBeingTypesAndCapacities(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), chargerTypes, capacities);
            }

            if (!companyNames.isEmpty() && !chargerTypes.isEmpty() && !capacities.isEmpty()) {
                // 7. 모든 필터 존재
                return stationRepository.findAllByFilteringBeingAllFilters(pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames, capacities, chargerTypes);
            }
        }


        // 2. station Id 있는 경우
        if (companyNames.isEmpty() && chargerTypes.isEmpty() && capacities.isEmpty()) {
            // 필터 없는 경우
            return stationRepository.findAllByFilteringNoneWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue());
        }

        if (!companyNames.isEmpty() && chargerTypes.isEmpty() && capacities.isEmpty()) {
            // 1. 회사명 필터링
            return stationRepository.findAllByFilteringBeingCompanyNamesWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames);
        }

        if (companyNames.isEmpty() && !chargerTypes.isEmpty() && capacities.isEmpty()) {
            // 2. 충전 타입 필터링
            return stationRepository.findAllByFilteringBeingTypesWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), chargerTypes);
        }

        if (companyNames.isEmpty() && chargerTypes.isEmpty() && !capacities.isEmpty()) {
            // 3. 충전 속도 필터링
            return stationRepository.findAllByFilteringBeingCapacitiesWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), capacities);
        }

        if (!companyNames.isEmpty() && !chargerTypes.isEmpty() && capacities.isEmpty()) {
            // 4. 회사명 + 충전 타입 필터링
            return stationRepository.findAllByFilteringBeingCompanyNamesAndTypesWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames, chargerTypes);
        }

        if (!companyNames.isEmpty() && !chargerTypes.isEmpty() && capacities.isEmpty()) {
            // 5. 회사명 + 충전 속도
            return stationRepository.findAllByFilteringBeingCompanyNamesAndCapacitiesWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames, capacities);
        }

        if (companyNames.isEmpty() && !chargerTypes.isEmpty() && !capacities.isEmpty()) {
            // 6. 충전 타입 + 충전 속도
            return stationRepository.findAllByFilteringBeingTypesAndCapacitiesWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), chargerTypes, capacities);
        }

        if (!companyNames.isEmpty() && !chargerTypes.isEmpty() && !capacities.isEmpty()) {
            // 7. 모든 필터 존재
            return stationRepository.findAllByFilteringBeingAllFiltersWithPaging(stationId, pageable, coordinate.minLatitudeValue(), coordinate.maxLatitudeValue(), coordinate.minLongitudeValue(), coordinate.maxLongitudeValue(), companyNames, capacities, chargerTypes);
        }


        return new ArrayList<>();
    }

    @Transactional(readOnly = true)
    public Station findStationById(String stationId) {
        return stationRepository.findChargeStationByStationId(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }

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
                .skip((page - 1) * limit)
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
