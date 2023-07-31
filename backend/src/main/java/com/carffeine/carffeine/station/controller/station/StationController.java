package com.carffeine.carffeine.station.controller.station;

import com.carffeine.carffeine.station.controller.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.controller.station.dto.StationsSimpleResponse;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.service.station.StationService;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class StationController {

    private final StationService stationService;

    @GetMapping("/stations")
    public ResponseEntity<StationsSimpleResponse> getStations(CoordinateRequest request,
                                                              @RequestParam(required = false, defaultValue = "") List<String> companyNames,
                                                              @RequestParam(required = false, defaultValue = "") List<ChargerType> chargerTypes,
                                                              @RequestParam(required = false, defaultValue = "") List<BigDecimal> capacities) {
        List<Station> stations = stationService.findByCoordinate(request, companyNames, chargerTypes, capacities);
        StationsSimpleResponse chargerStationsSimpleResponse = StationsSimpleResponse.from(stations);
        return ResponseEntity.ok(chargerStationsSimpleResponse);
    }


    @GetMapping("/stations/{stationId}")
    public ResponseEntity<StationSpecificResponse> getStationById(@PathVariable String stationId) {
        Station station = stationService.findStationById(stationId);
        return ResponseEntity.ok(StationSpecificResponse.from(station));
    }
}
