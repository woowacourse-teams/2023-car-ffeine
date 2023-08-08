package com.carffeine.carffeine.filter.controller.dto.filter;

import com.carffeine.carffeine.filter.controller.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.controller.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.controller.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.filter.controller.dto.capacity.CapacityResponse;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameResponse;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeResponse;

import java.util.List;

public record FiltersResponse(
        List<CompanyNameResponse> companyNames,
        List<CapacityResponse> capacities,
        List<ConnectorTypeResponse> connectorTypes) {

    public static FiltersResponse of(List<CompanyName> companyNames,
                                     List<Capacity> capacities,
                                     List<ConnectorType> connectorTypes) {
        List<CompanyNameResponse> companyNamesResponse = companyNames.stream()
                .map(CompanyNameResponse::from)
                .toList();

        List<CapacityResponse> capacitiesResponse = capacities.stream()
                .map(CapacityResponse::from)
                .toList();

        List<ConnectorTypeResponse> connectorTypesResponse = connectorTypes.stream()
                .map(ConnectorTypeResponse::of)
                .toList();

        return new FiltersResponse(companyNamesResponse, capacitiesResponse, connectorTypesResponse);
    }
}
