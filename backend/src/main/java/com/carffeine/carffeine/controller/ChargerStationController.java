package com.carffeine.carffeine.controller;

import com.carffeine.carffeine.controller.dto.ChargeStationSpecificResponse;
import com.carffeine.carffeine.controller.dto.ChargeStationsSimpleResponse;
import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.service.ChargerStationService;
import com.carffeine.carffeine.service.dto.CoordinateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class ChargerStationController {

    private final ChargerStationService chargerStationService;

    @GetMapping("/stations")
    public ResponseEntity<ChargeStationsSimpleResponse> getStations(@RequestBody CoordinateRequest request) {
        List<ChargeStation> chargeStations = chargerStationService.findByCoordinate(request);
        ChargeStationsSimpleResponse chargerStationsSimpleResponse = ChargeStationsSimpleResponse.from(chargeStations);
        return ResponseEntity.ok(chargerStationsSimpleResponse);
    }

    @GetMapping("/stations/{stationId}")
    public ResponseEntity<ChargeStationSpecificResponse> getStationById(@PathVariable String stationId) {
        ChargeStation chargeStation = chargerStationService.findStationById(stationId);
        return ResponseEntity.ok(ChargeStationSpecificResponse.from(chargeStation));
    }
}
