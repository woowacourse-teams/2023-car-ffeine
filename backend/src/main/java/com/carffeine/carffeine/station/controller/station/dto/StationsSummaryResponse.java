package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;

import java.util.List;

public record StationsSummaryResponse(
        List<StationSummaryResponse> stations
) {
}
