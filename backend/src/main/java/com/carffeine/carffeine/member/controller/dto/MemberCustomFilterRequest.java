package com.carffeine.carffeine.member.controller.dto;

import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeRequest;

import java.math.BigDecimal;
import java.util.List;

public record MemberCustomFilterRequest(List<CompanyNameRequest> companyNames,
                                        List<BigDecimal> capacities,
                                        List<ConnectorTypeRequest> connectorTypes) {
}
