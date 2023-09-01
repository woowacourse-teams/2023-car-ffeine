package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilter;
import com.carffeine.carffeine.car.domain.CarFilterRepository;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class FilterQueryServiceTest extends IntegrationTest {

    @Autowired
    private FilterQueryService filterQueryService;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private FilterRepository filterRepository;

    @Autowired
    private CarFilterRepository carFilterRepository;

    @Test
    void 차량의_필터를_조회한다() {
        // given
        Car car = carRepository.save(Car.from("아이오닉5", "2023"));
        List<Filter> filters = filterRepository.saveAll(List.of(Filter.of("회사명", FilterType.COMPANY.getName())));
        List<CarFilter> carFilters = carFilterRepository.saveAll(List.of(new CarFilter(car, filters.get(0))));

        // when
        FiltersResponse result = filterQueryService.findCarFilters(car.getId());

        // then
        assertThat(result).usingRecursiveComparison().isEqualTo(new FiltersResponse(List.of("회사명"), List.of(), List.of()));
    }

    @Test
    void 차량의_필터가_존재하지_않으면_예외를_발생한다() {
        // given
        Car car = carRepository.save(Car.from("아이오닉5", "2023"));
        filterRepository.saveAll(List.of(Filter.of("회사명", FilterType.COMPANY.getName())));

        // when & then
        assertThatThrownBy(() -> filterQueryService.findCarFilters(car.getId()))
                .isInstanceOf(FilterException.class)
                .hasMessage(FilterExceptionType.CAR_FILTER_NOT_FOUND.message());
    }
}
