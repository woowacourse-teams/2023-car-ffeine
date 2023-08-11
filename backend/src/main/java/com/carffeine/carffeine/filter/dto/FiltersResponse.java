package com.carffeine.carffeine.filter.dto;

import com.carffeine.carffeine.filter.domain.Filter;

import java.util.List;
import java.util.stream.Collectors;

public record FiltersResponse(
        List<String> companies,
        List<String> capacities,
        List<String> connectorTypes
) {

    public static FiltersResponse from(List<Filter> filters) {
        List<String> companies = filters.stream()
                .filter(it -> it.getFilterType().isCompanies())
                .map(Filter::getName)
                .toList();

        List<String> capacities = filters.stream()
                .filter(it -> it.getFilterType().isCapacities())
                .map(Filter::getName)
                .toList();

        List<String> connectorTypes = filters.stream()
                .filter(it -> it.getFilterType().isConnectorTypes())
                .map(Filter::getName)
                .toList();

        return new FiltersResponse(
                companies,
                capacities,
                connectorTypes
        );
    }

    public static FiltersResponse from(List<Filter> companiesFilter, List<Filter> capacitiesFilter, List<Filter> connectorTypesFilter) {
        List<String> companies = companiesFilter.stream()
                .map(Filter::getName)
                .collect(Collectors.toList());

        List<String> capacities = capacitiesFilter.stream()
                .map(Filter::getName)
                .collect(Collectors.toList());

        List<String> connectorTypes = connectorTypesFilter.stream()
                .map(Filter::getName)
                .collect(Collectors.toList());

        return new FiltersResponse(
                companies,
                capacities,
                connectorTypes
        );
    }
}
