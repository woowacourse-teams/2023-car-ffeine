package com.carffeine.carffeine.report.service.dto;

import com.carffeine.carffeine.report.domain.MisinformationDetailReport;

import java.util.List;

public record MisinformationReportRequest(
        List<StationDetailToUpdate> stationDetailsToUpdate
) {
    public List<MisinformationDetailReport> toDetailReports() {
        return stationDetailsToUpdate.stream()
                .map(StationDetailToUpdate::toDetailReport)
                .toList();
    }

    public record StationDetailToUpdate(
            String category,
            String reportedDetail
    ) {

        private MisinformationDetailReport toDetailReport() {
            return MisinformationDetailReport.builder()
                    .content(reportedDetail)
                    .category(category)
                    .build();
        }
    }
}
