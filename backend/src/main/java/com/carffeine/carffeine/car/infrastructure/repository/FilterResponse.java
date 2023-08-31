package com.carffeine.carffeine.car.infrastructure.repository;

import com.carffeine.carffeine.filter.domain.FilterType;

public record FilterResponse(String name, FilterType filterType) {
}
