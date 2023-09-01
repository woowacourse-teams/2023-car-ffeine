package com.carffeine.carffeine.filter.infrastructure.repository;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilter;
import com.carffeine.carffeine.car.domain.CarFilterRepository;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.config.QuerydslConfig;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.infrastructure.repository.dto.FilterResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@Import(value = {QuerydslConfig.class, FilterQueryRepository.class})
@DataJpaTest
class FilterQueryRepositoryTest {

    @Autowired
    private FilterQueryRepository filterQueryRepository;

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
        List<FilterResponse> result = filterQueryRepository.findCarFilters(car.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).name()).isEqualTo(carFilters.get(0).getFilter().getName());
            softly.assertThat(result.get(0).filterType()).isEqualTo(filters.get(0).getFilterType());
        });
    }
}
