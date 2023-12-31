package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.city.infrastructure.repository.CityQueryRepository;
import com.carffeine.carffeine.city.infrastructure.repository.dto.CitySearchResponse;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Coordinate;
import com.carffeine.carffeine.station.domain.station.Region;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.infrastructure.repository.station.StationQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.RegionMarker;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationInfo;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationPoint;
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
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class StationQueryService {

    private final StationQueryRepository stationQueryRepository;
    private final CityQueryRepository cityQueryRepository;

    public StationSpecificResponse findStationById(String stationId) {
        return stationQueryRepository.findStationById(stationId)
                .orElseThrow(() -> new StationException(StationExceptionType.NOT_FOUND_ID));
    }

    public List<StationSimpleResponse> findByLocation(CoordinateRequest request, List<String> companyNames, List<ChargerType> chargerTypes, List<BigDecimal> capacities) {
        Coordinate coordinate = Coordinate.of(request.latitude(), request.latitudeDelta(), request.longitude(), request.longitudeDelta());

        List<String> stationIds = stationQueryRepository.findStationIdsByCoordinate(
                coordinate.minLatitudeValue(),
                coordinate.maxLatitudeValue(),
                coordinate.minLongitudeValue(),
                coordinate.maxLongitudeValue(),
                companyNames,
                chargerTypes,
                capacities
        );
        if (stationIds.isEmpty()) {
            return Collections.emptyList();
        }
        return stationQueryRepository.findStationByStationIds(stationIds);
    }

    public List<StationSummaryResponse> findStationsSummary(List<String> stationIds) {
        return stationQueryRepository.findStationsSummary(stationIds);
    }

    public StationsSearchResponse searchStations(String query, Set<String> scope, int page, int limit) {
        StationSearchResult stationSearchResult = stationQueryRepository.findSearchResult(query, limit);
        List<StationSearchResponse> stationByScope = stationsToScope(stationSearchResult.stations(), scope);

        List<CitySearchResponse> citySearchResult = cityQueryRepository.findSearchResult(query);

        return new StationsSearchResponse(stationSearchResult.totalCount(), citySearchResult, stationByScope);
    }

    private List<StationSearchResponse> stationsToScope(List<StationInfo> searchResult, Set<String> scope) {
        return searchResult.stream()
                .map(it -> stationToScope(it, scope))
                .toList();
    }


    private StationSearchResponse stationToScope(StationInfo station, Set<String> scope) {
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

    public List<RegionMarker> findMarkersByRegions(List<String> regionNames) {
        List<Region> regions = Region.regions(regionNames);
        return stationQueryRepository.findCountByRegions(regions);
    }

    public List<StationPoint> findStationPoint(int page, int size) {
        return stationQueryRepository.findStationPoints(page, size);
    }

    public Long findStationCount() {
        return stationQueryRepository.findStationCount();
    }
}
