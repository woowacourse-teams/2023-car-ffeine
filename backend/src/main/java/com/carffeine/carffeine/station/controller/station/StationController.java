package com.carffeine.carffeine.station.controller.station;

import com.carffeine.carffeine.station.controller.station.dto.StationsSimpleResponse;
import com.carffeine.carffeine.station.controller.station.dto.StationsSummaryResponse;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import com.carffeine.carffeine.station.service.station.StationQueryService;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import com.carffeine.carffeine.station.service.station.dto.StationsSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@RestController
public class StationController {

    private final StationQueryService stationQueryService;

    @GetMapping("/stations")
    public ResponseEntity<StationsSimpleResponse> getStations(CoordinateRequest request,
                                                              @RequestParam(required = false, defaultValue = "") List<String> companyNames,
                                                              @RequestParam(required = false, defaultValue = "") List<ChargerType> chargerTypes,
                                                              @RequestParam(required = false, defaultValue = "") List<BigDecimal> capacities) {
        List<StationSimpleResponse> simpleResponses = stationQueryService.findByLocation(request, companyNames, chargerTypes, capacities);
        return ResponseEntity.ok(new StationsSimpleResponse(simpleResponses));
    }

    @GetMapping("/stations/search")
    public ResponseEntity<StationsSearchResponse> searchStations(@RequestParam(value = "q") String query,
                                                                 @RequestParam(value = "scope") Set<String> scope,
                                                                 @RequestParam(value = "limit", required = false, defaultValue = "12") int limit) {
        StationsSearchResponse stationSearchResponse = stationQueryService.searchStations(query, scope, limit);
        return ResponseEntity.ok(stationSearchResponse);
    }

    @GetMapping("/stations/{stationId}")
    public ResponseEntity<StationSpecificResponse> getStationById(@PathVariable String stationId) {
        return ResponseEntity.ok(stationQueryService.findStationById(stationId));
    }

    @GetMapping("/stations/summary")
    public ResponseEntity<StationsSummaryResponse> getStationsSummary(@RequestParam List<String> stationIds) {
        List<StationSummaryResponse> stations = stationQueryService.findStationsSummary(stationIds);
        return ResponseEntity.ok(new StationsSummaryResponse(stations));
    }
}
