package com.carffeine.carffeine.filter.controller;

import com.carffeine.carffeine.auth.controller.AuthMember;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/filters")
@RestController
public class FilterController {

    private final FilterService filterService;

    @GetMapping
    public ResponseEntity<FiltersResponse> findAllFilters(@AuthMember Long memberId) {
        return ResponseEntity.ok(FiltersResponse.from(filterService.findAllFilters(memberId)));
    }

    @PostMapping
    public ResponseEntity<FiltersResponse> addFilters(@AuthMember Long memberId,
                                                      @RequestBody FiltersRequest filtersRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(FiltersResponse.from(filterService.addFilters(memberId, filtersRequest)));
    }

    @DeleteMapping("/{filterName}")
    public ResponseEntity<Void> deleteFilter(@AuthMember Long memberId,
                                             @PathVariable String filterName) {
        filterService.deleteFilterByName(memberId, filterName);
        return ResponseEntity.noContent().build();
    }
}
