package com.carffeine.carffeine.station.service.report.dto;

import com.carffeine.carffeine.station.domain.report.MisinformationDetailReport;

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
            String reportDetail
    ) {

        private MisinformationDetailReport toDetailReport() {
            return MisinformationDetailReport.builder()
                    .content(reportDetail)
                    .category(category)
                    .build();
        }
    }
}
