package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FilterService {

    private final FilterRepository filterRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<Filter> findAllFilters() {
        return filterRepository.findAll();
    }

    @Transactional
    public List<Filter> addFilters(Long memberId, FiltersRequest filtersRequest) {
        validateRole(memberId);

        List<Filter> filters = makeFilters(filtersRequest);
        return filterRepository.saveAll(filters);
    }

    private List<Filter> makeFilters(FiltersRequest filtersRequest) {
        return filtersRequest.filters()
                .stream()
                .map(it -> Filter.of(it.name(), it.type()))
                .toList();
    }

    @Transactional
    public void deleteFilterByName(Long memberId, String filterName) {
        validateRole(memberId);
        deleteFilter(filterName);
    }

    private void validateRole(Long memberId) {
        memberRepository.findById(memberId)
                .filter(Member::isAdmin)
                .orElseThrow(() -> new AdminException(AdminExceptionType.NOT_ADMIN));
    }

    private void deleteFilter(String filterName) {
        Filter filter = filterRepository.findByName(filterName)
                .orElseThrow(() -> new FilterException(FilterExceptionType.FILTER_NOT_FOUND));

        filterRepository.deleteById(filter.getId());
    }
}
