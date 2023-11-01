package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.station.domain.report.FaultReport;

public record FaultReportsResponse(
        long id,
        String stationId,
        long memberId
) {

    public static FaultReportsResponse from(FaultReport faultReport) {
        return new FaultReportsResponse(faultReport.getId(), faultReport.getStation().getStationId(), faultReport.getMember().getId());
    }
}
