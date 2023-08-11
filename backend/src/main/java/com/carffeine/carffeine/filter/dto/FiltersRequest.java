package com.carffeine.carffeine.filter.dto;

import java.util.List;

public record FiltersRequest(
        List<String> companies,
        List<String> capacities,
        List<String> connectorTypes
) {
}
