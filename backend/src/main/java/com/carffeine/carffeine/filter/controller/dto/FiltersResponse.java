package com.carffeine.carffeine.filter.controller.dto;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.MemberFilter;

import java.util.List;

public record FiltersResponse(
        List<String> companies,
        List<String> capacities,
        List<String> connectorTypes
) {

    public static FiltersResponse from(List<Filter> filters) {
        return getResponse(filters);
    }

    private static FiltersResponse getResponse(final List<Filter> filters) {
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

    public static FiltersResponse fromMemberFilters(List<MemberFilter> memberFilters) {
        List<Filter> filters = memberFilters.stream()
                .map(MemberFilter::getFilter)
                .toList();

        return getResponse(filters);
    }
}
