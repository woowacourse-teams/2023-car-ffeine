package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import java.math.BigDecimal;
import java.util.List;

public record StationSearchResult(
        Long totalCount,
        List<StationSearchResponse> stations
) {
    public record StationSearchResponse(
            String stationId,
            String stationName,
            String address,
            BigDecimal latitude,
            BigDecimal longitude
    ) {
    }
}
