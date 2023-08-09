package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.MisinformationReportResponse;
import com.carffeine.carffeine.admin.service.AdminReportService;
import com.carffeine.carffeine.auth.controller.AuthMember;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminReportController {

    private final AdminReportService adminReportService;

    @GetMapping("/misinformation-reports")
    public ResponseEntity<CustomPage<MisinformationReportResponse>> getMisinformation(
            @AuthMember Long memberId,
            Pageable pageable
    ) {
        Page<MisinformationReport> pagedMisinformationReports = adminReportService.getMisinformationReports(pageable, memberId);
        int totalPages = pagedMisinformationReports.getTotalPages();
        List<MisinformationReportResponse> elements = pagedMisinformationReports.getContent().stream()
                .map(MisinformationReportResponse::from)
                .toList();
        return ResponseEntity.ok(new CustomPage<>(totalPages, elements));
    }
}
