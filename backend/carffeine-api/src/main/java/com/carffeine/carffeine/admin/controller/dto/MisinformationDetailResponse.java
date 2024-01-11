package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.report.domain.MisinformationDetailReport;
import com.carffeine.carffeine.report.domain.MisinformationReport;

import java.util.List;

public record MisinformationDetailResponse(
        long id,
        long memberId,
        String stationId,
        boolean isChecked,
        List<MisinformationReportDetailResponse> details
) {

    public static MisinformationDetailResponse from(MisinformationReport report) {
        List<MisinformationReportDetailResponse> details = report.getMisinformationDetailReports().stream()
                .map(MisinformationReportDetailResponse::from)
                .toList();
        return new MisinformationDetailResponse(report.getId(), report.getMember().getId(), report.getStation().getStationId(), report.isChecked(), details);
    }

    public record MisinformationReportDetailResponse(
            long detailId,
            String category,
            String content
    ) {

        public static MisinformationReportDetailResponse from(MisinformationDetailReport report) {
            return new MisinformationReportDetailResponse(report.getId(), report.getCategory(), report.getContent());
        }
    }
}
