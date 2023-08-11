package com.carffeine.carffeine.filter.controller.dto;

import com.carffeine.carffeine.filter.domain.Filter;

import java.util.List;

public record FiltersResponse(
        List<String> companies,
        List<String> capacities,
        List<String> connectorTypes
) {

    public static FiltersResponse from(List<Filter> filters) {
        List<String> companies = filters.stream()
                .filter(it -> it.getFilterType().isCompanyType())
                .map(Filter::getName)
                .toList();

        List<String> capacities = filters.stream()
                .filter(it -> it.getFilterType().isCapacityType())
                .map(Filter::getName)
                .toList();

        List<String> connectorTypes = filters.stream()
                .filter(it -> it.getFilterType().isConnectorType())
                .map(Filter::getName)
                .toList();

        return new FiltersResponse(
                companies,
                capacities,
                connectorTypes
        );
    }
}
