package com.carffeine.carffeine.station.controller.report;

import com.carffeine.carffeine.station.controller.report.dto.DuplicateReportResponse;
import com.carffeine.carffeine.station.service.report.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/api/stations/{stationId}/reports")
    public ResponseEntity<Void> saveReport(
            @PathVariable String stationId,
            @RequestHeader("Authorization") Long memberId
    ) {
        reportService.saveFaultReport(stationId, memberId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/stations/{stationId}/reports/me")
    public ResponseEntity<DuplicateReportResponse> isDuplicateReport(
            @PathVariable String stationId,
            @RequestHeader("Authorization") Long memberId
    ) {
        boolean isAlreadyReport = reportService.isDuplicateReportStation(memberId, stationId);
        DuplicateReportResponse response = new DuplicateReportResponse(isAlreadyReport);
        return ResponseEntity.ok(response);
    }
}