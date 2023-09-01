package com.carffeine.carffeine.filter.controller;

import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.service.FilterService;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class FilterController {

    private final FilterService filterService;

    @GetMapping("/filters")
    public ResponseEntity<FiltersResponse> findAllFilters() {
        return ResponseEntity.ok(FiltersResponse.from(filterService.findAllFilters()));
    }

    @PostMapping("/filters")
    public ResponseEntity<FiltersResponse> addFilters(@AuthMember Long memberId,
                                                      @RequestBody FiltersRequest filtersRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(FiltersResponse.from(filterService.addFilters(memberId, filtersRequest)));
    }

    @DeleteMapping("/filters/{filterName}")
    public ResponseEntity<Void> deleteFilter(@AuthMember Long memberId,
                                             @PathVariable String filterName) {
        filterService.deleteFilterByName(memberId, filterName);
        return ResponseEntity.noContent().build();
    }
}
