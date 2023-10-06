package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.station.infrastructure.repository.city.dto.CitySearchResponse;

import java.util.List;

public record StationsSearchResponse(Long totalCount,
                                     List<CitySearchResponse> cities,
                                     List<StationSearchResponse> stations) {
}
