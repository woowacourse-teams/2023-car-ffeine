package com.carffeine.carffeine.station.dto;

import com.carffeine.carffeine.station.infrastructure.dto.StationSummaryResponse;

import java.util.List;

public record StationsSummaryResponse(
        List<StationSummaryResponse> stations
) {
}
