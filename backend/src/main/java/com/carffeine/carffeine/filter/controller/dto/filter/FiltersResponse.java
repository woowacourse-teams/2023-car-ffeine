package com.carffeine.carffeine.filter.controller.dto.filter;

import com.carffeine.carffeine.filter.controller.dto.capacity.CapacityResponse;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameResponse;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;

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
