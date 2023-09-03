package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Coordinate;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.infrastructure.repository.station.StationQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class StationQueryService {

    private final StationQueryRepository stationQueryRepository;

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
}
