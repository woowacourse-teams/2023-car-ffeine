package com.carffeine.carffeine.station.controller.station.dto;

import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;

import java.util.List;

public record StationsSimpleResponse(List<StationSimpleResponse> stations) {
}

