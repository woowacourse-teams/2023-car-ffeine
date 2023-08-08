package com.carffeine.carffeine.filter.controller;

import com.carffeine.carffeine.filter.controller.dto.capacity.CapacitiesRequest;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNamesRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypesRequest;
import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.filter.service.FilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/filters")
@RestController
public class FilterController {

    private final FilterService filterService;

    @GetMapping
    public ResponseEntity<FiltersResponse> findAllFilters() {
        return ResponseEntity.ok(filterService.findAllFilters());
    }

    @PostMapping("/company-names")
    public ResponseEntity<Void> addCompanyNamesFilter(@RequestBody CompanyNamesRequest companyNamesRequest) {
        filterService.saveCompanyNamesFilter(companyNamesRequest);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/connector-types")
    public ResponseEntity<Void> addConnectorTypesFilter(@RequestBody ConnectorTypesRequest connectorTypesRequest) {
        filterService.saveConnectorTypesFilter(connectorTypesRequest);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/capacities")
    public ResponseEntity<Void> addCapacitiesFilter(@RequestBody CapacitiesRequest capacitiesRequest) {
        filterService.saveCapacitiesFilter(capacitiesRequest);
        return ResponseEntity.noContent().build();
    }
}
