package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.dto.FiltersRequest;
import com.carffeine.carffeine.filter.dto.FiltersResponse;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FilterService {

    private final FilterRepository filterRepository;

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<Filter> findAllFilters(Long memberId) {
        validateRole(memberId);
        return filterRepository.findAll();
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    @Transactional
    public FiltersResponse addFilters(Long memberId, FiltersRequest filtersRequest) {
        validateRole(memberId);

        List<Filter> companies = saveFilters(filtersRequest.companies(), FilterType.COMPANIES);
        List<Filter> capacities = saveFilters(filtersRequest.capacities(), FilterType.CAPACITIES);
        List<Filter> connectorTypes = saveFilters(filtersRequest.connectorTypes(), FilterType.CONNECTOR_TYPES);

        return FiltersResponse.from(companies, capacities, connectorTypes);
    }

    private List<Filter> saveFilters(List<String> filterNames, FilterType filterType) {
        if (filterNames.isEmpty()) {
            return Collections.emptyList();
        }

        List<Filter> filters = filterNames.stream()
                .map(it -> Filter.of(it, filterType.getName()))
                .collect(Collectors.toList());

        return filterRepository.saveAll(filters);
    }

    @Transactional
    public void deleteFilter(Long memberId, String filterName) {
        validateRole(memberId);
        filterRepository.findByName(filterName)
                .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND));

        filterRepository.deleteByName(filterName);
    }
}
