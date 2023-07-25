package com.carffeine.carffeine.station.controller.congestion;

import com.carffeine.carffeine.station.controller.congestion.dto.StatisticsResponse;
import com.carffeine.carffeine.station.service.congestion.CongestionService;
import com.carffeine.carffeine.station.service.congestion.dto.StatisticsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CongestionController {

    private final CongestionService congestionService;

    @GetMapping("/api/stations/{stationId}/statistics")
    public ResponseEntity<StatisticsResponse> showCongestionStatistics(@PathVariable String stationId) {
        StatisticsResponse statisticsResponse = congestionService.calculateCongestion(new StatisticsRequest(stationId));
        return ResponseEntity.ok(statisticsResponse);
    }
}
