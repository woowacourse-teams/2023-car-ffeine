package com.carffeine.carffeine.station.infrastructure.repository.station.dto;

import java.util.List;

public record StationSearchResult(
        Long totalCount,
        List<StationInfo> stations
) {
}
