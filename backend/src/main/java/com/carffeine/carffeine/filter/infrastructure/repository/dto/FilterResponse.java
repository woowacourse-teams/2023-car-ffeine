package com.carffeine.carffeine.filter.infrastructure.repository.dto;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterType;

public record FilterResponse(String name, FilterType filterType) {

    public static Filter toFilter(String name, FilterType filterType) {
        return new Filter(name, filterType);
    }
}
