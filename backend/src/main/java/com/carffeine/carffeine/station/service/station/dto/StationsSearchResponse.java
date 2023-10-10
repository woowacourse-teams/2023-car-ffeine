package com.carffeine.carffeine.station.service.station.dto;

import com.carffeine.carffeine.city.infrastructure.repository.dto.CitySearchResponse;

import java.util.List;

public record StationsSearchResponse(Long totalCount,
                                     List<CitySearchResponse> cities,
                                     List<StationSearchResponse> stations) {
}
