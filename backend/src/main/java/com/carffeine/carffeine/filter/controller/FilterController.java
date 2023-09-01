package com.carffeine.carffeine.filter.controller;

import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.MemberFilter;
import com.carffeine.carffeine.filter.service.FilterQueryService;
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

import java.util.List;

@RequiredArgsConstructor
@RestController
public class FilterController {

    private final FilterService filterService;
    private final FilterQueryService filterQueryService;

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

    @GetMapping("/cars/{carId}/filters")
    public ResponseEntity<FiltersResponse> findCarFilters(@PathVariable Long carId) {
        return ResponseEntity.ok(filterQueryService.findCarFilters(carId));
    }

    @PostMapping("/cars/{carId}/filters")
    public ResponseEntity<FiltersResponse> addCarFilters(@AuthMember Long memberId,
                                                         @PathVariable Long carId,
                                                         @RequestBody FiltersRequest filtersRequest) {
        List<Filter> filters = filterService.addCarFilters(memberId, carId, filtersRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(FiltersResponse.from(filters));
    }

    @GetMapping("/members/{memberId}/filters")
    public ResponseEntity<FiltersResponse> findMemberFilters(@PathVariable Long memberId,
                                                             @AuthMember Long loginMember) {
        List<Filter> memberFilters = filterService.findMemberFilters(memberId, loginMember);
        return ResponseEntity.ok(FiltersResponse.from(memberFilters));
    }

    @PostMapping("/members/{memberId}/filters")
    public ResponseEntity<FiltersResponse> addMemberFilters(@PathVariable Long memberId,
                                                            @AuthMember Long loginMember,
                                                            @RequestBody FiltersRequest filtersRequest) {
        List<MemberFilter> memberFilters = filterService.addMemberFilters(memberId, loginMember, filtersRequest);
        return ResponseEntity.ok(FiltersResponse.fromMemberFilters(memberFilters));
    }
}
