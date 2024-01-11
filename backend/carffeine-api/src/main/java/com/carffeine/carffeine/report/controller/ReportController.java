package com.carffeine.carffeine.report.controller;

import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.report.dto.DuplicateReportResponse;
import com.carffeine.carffeine.report.service.ReportService;
import com.carffeine.carffeine.report.service.dto.MisinformationReportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/stations/{stationId}/reports")
    public ResponseEntity<Void> saveReport(
            @PathVariable String stationId,
            @AuthMember Long memberId
    ) {
        reportService.saveFaultReport(stationId, memberId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/stations/{stationId}/misinformation-reports")
    public ResponseEntity<Void> saveMisinformationReport(
            @PathVariable String stationId,
            @AuthMember Long memberId,
            @RequestBody MisinformationReportRequest request
    ) {
        reportService.saveMisinformationReport(stationId, memberId, request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stations/{stationId}/reports/me")
    public ResponseEntity<DuplicateReportResponse> isDuplicateReport(
            @PathVariable String stationId,
            @AuthMember Long memberId
    ) {
        boolean isAlreadyReport = reportService.isDuplicateReportStation(memberId, stationId);
        DuplicateReportResponse response = new DuplicateReportResponse(isAlreadyReport);
        return ResponseEntity.ok(response);
    }
}
