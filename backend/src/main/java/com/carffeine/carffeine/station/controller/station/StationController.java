package com.carffeine.carffeine.station.controller.station;

import com.carffeine.carffeine.station.controller.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.controller.station.dto.StationsSimpleResponse;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.service.station.StationService;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import com.carffeine.carffeine.station.service.station.dto.StationsSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
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

    private final StationService stationService;

    @GetMapping("/stations")
    public ResponseEntity<StationsSimpleResponse> getStations(CoordinateRequest request,
                                                              @RequestParam(required = false, defaultValue = "") List<String> companyNames,
                                                              @RequestParam(required = false, defaultValue = "") List<ChargerType> chargerTypes,
                                                              @RequestParam(required = false, defaultValue = "") List<BigDecimal> capacities,
                                                              @RequestParam(required = false) String stationId) {
        List<Station> stations = stationService.findByCoordinateV2(stationId, PageRequest.ofSize(11), request, companyNames, chargerTypes, capacities);
        StationsSimpleResponse chargerStationsSimpleResponse = StationsSimpleResponse.from(stations);
        return ResponseEntity.ok(chargerStationsSimpleResponse);
    }

    public ResponseEntity<StationsSimpleResponse> getStations(CoordinateRequest request,
                                                              @RequestParam(required = false, defaultValue = "") List<String> companyNames,
                                                              @RequestParam(required = false, defaultValue = "") List<ChargerType> chargerTypes,
                                                              @RequestParam(required = false, defaultValue = "") List<BigDecimal> capacities) {
        List<Station> stations = stationService.findByCoordinate(request, companyNames, chargerTypes, capacities);
        StationsSimpleResponse chargerStationsSimpleResponse = StationsSimpleResponse.from(stations);
        return ResponseEntity.ok(chargerStationsSimpleResponse);
    }

    @GetMapping("/stations/search")
    public ResponseEntity<StationsSearchResponse> searchStations(@RequestParam(value = "q") String query,
                                                                 @RequestParam(value = "scope") Set<String> scope,
                                                                 @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                                 @RequestParam(value = "limit", required = false, defaultValue = "12") int limit) {
        StationsSearchResponse stationSearchResponse = stationService.searchStations(query, scope, page, limit);
        return ResponseEntity.ok(stationSearchResponse);
    }

    @GetMapping("/stations/{stationId}")
    public ResponseEntity<StationSpecificResponse> getStationById(@PathVariable String stationId) {
        Station station = stationService.findStationById(stationId);
        return ResponseEntity.ok(StationSpecificResponse.from(station));
    }
}
