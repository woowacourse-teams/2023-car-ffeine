package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.filter.controller.dto.capacity.CapacitiesRequest;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNamesRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypesRequest;
import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.capacity.CapacityRepository;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.companyName.CompanyNameRepository;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorTypeRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FilterService {

    private final CompanyNameRepository companyNameRepository;
    private final ConnectorTypeRepository connectorTypeRepository;
    private final CapacityRepository capacityRepository;

    @Transactional(readOnly = true)
    public FiltersResponse findAllFilters() {
        List<CompanyName> companyNames = companyNameRepository.findAll();
        List<Capacity> capacities = capacityRepository.findAll();
        List<ConnectorType> connectorTypes = connectorTypeRepository.findAll();

        return FiltersResponse.of(companyNames, capacities, connectorTypes);
    }

    @Transactional
    public void saveCompanyNamesFilter(CompanyNamesRequest companyNamesRequest) {
        validateDuplicatedName(companyNamesRequest);

        List<CompanyName> companyNames = companyNamesRequest.companyNames()
                .stream()
                .map(it -> CompanyName.from(it.companyName()))
                .toList();

        companyNameRepository.saveAll(companyNames);
    }

    @Transactional
    public void saveConnectorTypesFilter(ConnectorTypesRequest connectorTypesRequest) {
        validateDuplicatedConnectorType(connectorTypesRequest);

        List<ConnectorType> connectorTypes = connectorTypesRequest.connectTypes()
                .stream()
                .map(it -> ConnectorType.from(it.connectorKey(), it.value()))
                .toList();

        connectorTypeRepository.saveAll(connectorTypes);
    }

    @Transactional
    public void saveCapacitiesFilter(CapacitiesRequest capacitiesRequest) {
        validateDuplicatedCapacity(capacitiesRequest);

        List<Capacity> capacities = capacitiesRequest.capacities()
                .stream()
                .map(it -> Capacity.from(it.capacity()))
                .toList();

        capacityRepository.saveAll(capacities);
    }

    private void validateDuplicatedName(CompanyNamesRequest companyNamesRequest) {
        boolean isExistsCompanyNamesAlready = companyNamesRequest.companyNames()
                .stream()
                .anyMatch(it -> companyNameRepository.existsByCompanyName(it.companyName()));

        if (isExistsCompanyNamesAlready) {
            throw new FilterException(FilterExceptionType.FILTER_ALREADY_REGISTERED);
        }
    }

    private void validateDuplicatedConnectorType(ConnectorTypesRequest connectorTypesRequest) {
        boolean isExistsConnectorType = connectorTypesRequest.connectTypes()
                .stream()
                .anyMatch(it -> connectorTypeRepository.existsByConnectorKey(it.connectorKey()));

        if (isExistsConnectorType) {
            throw new FilterException(FilterExceptionType.FILTER_ALREADY_REGISTERED);
        }
    }

    private void validateDuplicatedCapacity(CapacitiesRequest capacitiesRequest) {
        boolean isExistsCompanyNamesAlready = capacitiesRequest.capacities()
                .stream()
                .anyMatch(it -> capacityRepository.existsByCapacity(it.capacity()));

        if (isExistsCompanyNamesAlready) {
            throw new FilterException(FilterExceptionType.FILTER_ALREADY_REGISTERED);
        }
    }
}
