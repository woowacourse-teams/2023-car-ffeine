package com.carffeine.carffeine.filter.controller;

import com.carffeine.carffeine.filter.dto.FiltersRequest;
import com.carffeine.carffeine.filter.dto.FiltersResponse;
import com.carffeine.carffeine.filter.service.FilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        return ResponseEntity.ok(FiltersResponse.from(filterService.findAllFilters()));
    }

    @PostMapping
    public ResponseEntity<FiltersResponse> addFilters(@RequestBody FiltersRequest filtersRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(filterService.addFilters(filtersRequest));
    }

    @DeleteMapping("/{filterName}")
    public ResponseEntity<Void> deleteFilter(@PathVariable String filterName) {
        filterService.deleteFilter(filterName);
        return ResponseEntity.noContent().build();
    }
}
