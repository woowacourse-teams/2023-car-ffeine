package com.carffeine.carffeine.station.service.station.dto;

import java.util.List;

public record StationsSearchResponse(int totalCount,
                                     List<StationSearchResponse> stations) {
}
