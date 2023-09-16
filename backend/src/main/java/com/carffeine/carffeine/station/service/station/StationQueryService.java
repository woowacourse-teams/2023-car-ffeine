package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Coordinate;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.infrastructure.repository.station.StationCacheRepository;
import com.carffeine.carffeine.station.infrastructure.repository.station.StationQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationInfo;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSearchResult;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import com.carffeine.carffeine.station.service.station.dto.StationSearchResponse;
import com.carffeine.carffeine.station.service.station.dto.StationsSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class StationQueryService {

    private final StationQueryRepository stationQueryRepository;
    private final StationCacheRepository stationCacheRepository;

    public StationSpecificResponse findStationById(String stationId) {
        return stationQueryRepository.findStationById(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }

    public List<StationSimpleResponse> findByLocation(CoordinateRequest request, List<String> companyNames, List<ChargerType> chargerTypes, List<BigDecimal> capacities) {
        Coordinate coordinate = Coordinate.of(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());
        List<StationInfo> stationInfos = stationCacheRepository.findByCoordinate(
                coordinate.minLatitudeValue(),
                coordinate.maxLatitudeValue(),
                coordinate.minLongitudeValue(),
                coordinate.maxLongitudeValue(),
                companyNames,
                chargerTypes,
                capacities
        );
        Map<String, Long> stationByStationIds = stationQueryRepository.findStationByStationIds(stationInfos.stream().map(StationInfo::stationId).toList());
        return stationInfos.stream()
                .map(it -> StationSimpleResponse.of(it, stationByStationIds.get(it.stationId())))
                .toList();
    }

    public List<StationSummaryResponse> findStationsSummary(List<String> stationIds) {
        return stationQueryRepository.findStationsSummary(stationIds);
    }

    public StationsSearchResponse searchStations(String query, Set<String> scope, int page, int limit) {
        StationSearchResult searchResult = stationQueryRepository.findSearchResult(query, limit);
        List<StationSearchResponse> stationByScope = stationsToScope(searchResult.stations(), scope);
        return new StationsSearchResponse(searchResult.totalCount(), stationByScope);
    }

    private List<StationSearchResponse> stationsToScope(List<StationSearchResult.StationSearchResponse> searchResult, Set<String> scope) {
        return searchResult.stream()
                .map(it -> stationToScope(it, scope))
                .toList();
    }

    private StationSearchResponse stationToScope(StationSearchResult.StationSearchResponse station, Set<String> scope) {
        StationSearchResponse.StationSearchResponseBuilder builder = StationSearchResponse.builder();
        if (scope.contains("stationName")) {
            builder.stationName(station.stationName());
        }
        if (scope.contains("address")) {
            builder.address(station.address());
        }
        if (scope.contains("latitude")) {
            builder.latitude(station.latitude());
        }
        if (scope.contains("longitude")) {
            builder.longitude(station.longitude());
        }
        builder.stationId(station.stationId());
        return builder.build();
    }
}
