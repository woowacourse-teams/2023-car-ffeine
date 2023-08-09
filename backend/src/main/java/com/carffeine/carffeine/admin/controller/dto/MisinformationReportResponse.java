package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.report.MisinformationDetailReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;

import java.util.List;

public record MisinformationReportResponse(
        long id,
        long memberId,
        boolean isChecked,
        List<MisinformationReportDetailResponse> details
) {

    public static MisinformationReportResponse from(MisinformationReport report) {
        List<MisinformationReportDetailResponse> details = report.getMisinformationDetailReports().stream()
                .map(MisinformationReportDetailResponse::from)
                .toList();
        return new MisinformationReportResponse(report.getId(), report.getMember().getId(), report.isChecked(), details);
    }

    public record MisinformationReportDetailResponse(
            String category,
            String content
    ) {

        public static MisinformationReportDetailResponse from(MisinformationDetailReport report) {
            return new MisinformationReportDetailResponse(report.getCategory(), report.getContent());
        }
    }

}
