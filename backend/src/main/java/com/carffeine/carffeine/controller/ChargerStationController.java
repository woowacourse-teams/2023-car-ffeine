package com.carffeine.carffeine.controller;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.dto.ChargeStationsSimpleResponse;
import com.carffeine.carffeine.dto.CoordinateRequest;
import com.carffeine.carffeine.service.ChargerStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class ChargerStationController {

    private final ChargerStationService chargerStationService;

    @GetMapping
    public ResponseEntity<ChargeStationsSimpleResponse> getStations(@RequestBody CoordinateRequest request) {
        List<ChargeStation> chargeStations = chargerStationService.findByCoordinate(request);
        ChargeStationsSimpleResponse chargerStationsSimpleResponse = ChargeStationsSimpleResponse.from(chargeStations);
        return ResponseEntity.ok(chargerStationsSimpleResponse);
    }
}
