package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.report.MisinformationReport;

public record MisinformationReportResponse(
        long id,
        long memberId,
        boolean isChecked
) {

    public static MisinformationReportResponse from(MisinformationReport report) {
        return new MisinformationReportResponse(report.getId(), report.getMember().getId(), report.isChecked());
    }

//    public record MisinformationReportDetailResponse(
//            String category,
//            String content
//    ) {
//
//        public static MisinformationReportDetailResponse from(MisinformationDetailReport report) {
//            return new MisinformationReportDetailResponse(report.getCategory(), report.getContent());
//        }
//    }

}
