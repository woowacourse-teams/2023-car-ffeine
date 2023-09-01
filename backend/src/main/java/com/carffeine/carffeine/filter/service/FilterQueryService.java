package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.car.infrastructure.dto.FilterResponse;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.infrastructure.repository.FilterQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.carffeine.carffeine.filter.exception.FilterExceptionType.CAR_FILTER_NOT_FOUND;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FilterQueryService {

    private final FilterQueryRepository filterQueryRepository;

    public FiltersResponse findCarFilters(Long carId) {
        List<Filter> filters = findFilters(carId);
        validateEmpty(filters);
        return FiltersResponse.from(filters);
    }

    private List<Filter> findFilters(Long carId) {
        return filterQueryRepository.findCarFilters(carId)
                .stream()
                .map(it -> FilterResponse.toFilter(it.name(), it.filterType()))
                .toList();
    }

    private void validateEmpty(List<Filter> filters) {
        if (filters.isEmpty()) {
            throw new FilterException(CAR_FILTER_NOT_FOUND);
        }
    }
}
