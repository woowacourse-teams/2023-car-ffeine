package com.carffeine.carffeine.filter.infrastructure.repository.dto;

import com.carffeine.carffeine.filter.domain.FilterType;

public record FilterResponse(String name, FilterType filterType) {
}
