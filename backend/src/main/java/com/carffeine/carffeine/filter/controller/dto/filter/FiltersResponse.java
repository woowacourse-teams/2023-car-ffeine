package com.carffeine.carffeine.filter.controller.dto.filter;

import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameResponse;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.member.controller.dto.MemberCustomFilterRequest;

import java.math.BigDecimal;
import java.util.List;

public record FiltersResponse(
        List<CompanyNameResponse> companyNames,
        List<BigDecimal> capacities,
        List<ConnectorTypeResponse> connectorTypes) {

    public static FiltersResponse of(List<CompanyName> companyNames,
                                     List<Capacity> capacities,
                                     List<ConnectorType> connectorTypes) {
        List<CompanyNameResponse> companyNamesResponse = companyNames.stream()
                .map(CompanyNameResponse::from)
                .toList();

        List<BigDecimal> capacitiesResponse = capacities.stream()
                .map(Capacity::getCapacity)
                .toList();

        List<ConnectorTypeResponse> connectorTypesResponse = connectorTypes.stream()
                .map(ConnectorTypeResponse::of)
                .toList();

        return new FiltersResponse(companyNamesResponse, capacitiesResponse, connectorTypesResponse);
    }

    public static FiltersResponse from(final MemberCustomFilterRequest memberCustomFilterRequest) {
        List<CompanyNameResponse> companyNameResponses = memberCustomFilterRequest.companyNames()
                .stream()
                .map(it -> CompanyNameResponse.from(CompanyName.from(it.key(), it.value())))
                .toList();

        List<BigDecimal> capacityResponses = memberCustomFilterRequest.capacities();

        List<ConnectorTypeResponse> connectorTypeResponses = memberCustomFilterRequest.connectorTypes()
                .stream()
                .map(it -> ConnectorTypeResponse.of(ConnectorType.from(it.key(), it.value())))
                .toList();

        return new FiltersResponse(companyNameResponses, capacityResponses, connectorTypeResponses);
    }
}
