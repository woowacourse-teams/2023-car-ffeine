package com.carffeine.carffeine.station.service.station.dto;

import java.util.List;

public record StationsSearchResponse(Long totalCount,
                                     List<StationSearchResponse> stations) {
}
