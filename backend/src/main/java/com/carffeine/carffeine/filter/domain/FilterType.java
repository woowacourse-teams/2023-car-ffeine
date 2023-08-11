package com.carffeine.carffeine.filter.domain;

import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;

import java.util.Arrays;

public enum FilterType {

    COMPANIES("companies"),
    CAPACITIES("capacities"),
    CONNECTOR_TYPES("connectorTypes");

    private final String name;

    FilterType(String name) {
        this.name = name;
    }

    public static FilterType from(String name) {
        return Arrays.stream(values())
                .filter(it -> it.getName().equals(name))
                .findAny()
                .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND));
    }

    public boolean isCompanies() {
        return this.name.equals(COMPANIES.name);
    }

    public boolean isConnectorTypes() {
        return this.name.equals(CONNECTOR_TYPES.name);
    }

    public boolean isCapacities() {
        return this.name.equals(CAPACITIES.name);
    }

    public String getName() {
        return name;
    }
}
