package com.carffeine.carffeine.station.controller;

import com.carffeine.carffeine.station.dto.StatisticsResponse;
import com.carffeine.carffeine.station.service.congestion.CongestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CongestionController {

    private final CongestionService congestionService;

    @GetMapping("/stations/{stationId}/statistics")
    public ResponseEntity<StatisticsResponse> showCongestionStatistics(@PathVariable String stationId,
                                                                       @RequestParam(required = false, defaultValue = "monday") String dayOfWeek) {
        StatisticsResponse statisticsResponse = congestionService.showCongestionStatistics(stationId, dayOfWeek);
        return ResponseEntity.ok(statisticsResponse);
    }
}
