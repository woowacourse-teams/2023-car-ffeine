package com.carffeine.carffeine.controller.chargerStation;

import com.carffeine.carffeine.controller.chargerStation.dto.ChargeStationSpecificResponse;
import com.carffeine.carffeine.controller.chargerStation.dto.ChargeStationsSimpleResponse;
import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.service.chargerstation.ChargeStationPeriodicUpdateService;
import com.carffeine.carffeine.service.chargerstation.ChargerStationService;
import com.carffeine.carffeine.service.chargerstation.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class ChargerStationController {

    private final ChargerStationService chargerStationService;
    private final ChargeStationPeriodicUpdateService chargeStationPeriodicUpdateService;

    @GetMapping("/stations")
    public ResponseEntity<ChargeStationsSimpleResponse> getStations(CoordinateRequest request) {
        List<ChargeStation> chargeStations = chargerStationService.findByCoordinate(request);
        ChargeStationsSimpleResponse chargerStationsSimpleResponse = ChargeStationsSimpleResponse.from(chargeStations);
        return ResponseEntity.ok(chargerStationsSimpleResponse);
    }

    @GetMapping("/stations/{stationId}")
    public ResponseEntity<ChargeStationSpecificResponse> getStationById(@PathVariable String stationId) {
        ChargeStation chargeStation = chargerStationService.findStationById(stationId);
        return ResponseEntity.ok(ChargeStationSpecificResponse.from(chargeStation));
    }

    @GetMapping
    public void a() {
        chargeStationPeriodicUpdateService.updatePeriodicStations();

    }
}
