package com.carffeine.carffeine.station.dto;

import com.carffeine.carffeine.station.infrastructure.dto.StationSimpleResponse;

import java.util.List;

public record StationsSimpleResponse(List<StationSimpleResponse> stations) {
}

