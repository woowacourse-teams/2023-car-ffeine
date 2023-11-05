package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.report.domain.MisinformationReport;

public record MisinformationReportResponse(
        long id,
        long memberId,
        String stationId,
        boolean isChecked
) {

    public static MisinformationReportResponse from(MisinformationReport report) {
        return new MisinformationReportResponse(report.getId(), report.getMember().getId(), report.getStation().getStationId(), report.isChecked());
    }
}
