package com.carffeine.carffeine.car.domain;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static com.carffeine.carffeine.fixture.filter.FilterFixture.createCapacityFilter;
import static com.carffeine.carffeine.fixture.filter.FilterFixture.createCompanyFilter;
import static com.carffeine.carffeine.fixture.filter.FilterFixture.createConnectorTypeFilter;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class CarFilterRepositoryTest {

    @Autowired
    private CarFilterRepository carFilterRepository;

    @Autowired
    private FilterRepository filterRepository;

    @Autowired
    private CarRepository carRepository;

    private List<Filter> filterList;
    private Car car;

    @BeforeEach
    void setup() {
        filterList = filterRepository.saveAll(
                List.of(createCompanyFilter(), createConnectorTypeFilter(), createCapacityFilter())
        );

        car = carRepository.save(Car.from("아이오닉5", "2022-A"));
    }

    @Test
    void 모든_차량_필터를_조회한다() {
        // given
        carFilterRepository.saveAll(List.of(new CarFilter(car, filterList.get(0))));

        // when
        List<CarFilter> carFilters = carFilterRepository.findAllByCar(car);

        // then
        assertThat(carFilters.get(0).getFilter()).isEqualTo(filterList.get(0));
    }

    @Test
    void 차량에_필터를_적용한다() {
        // when
        List<CarFilter> carFilters = carFilterRepository.saveAll(List.of(new CarFilter(car, filterList.get(0))));

        // then
        List<CarFilter> result = carFilterRepository.findAllByCar(car);

        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0)).isEqualTo(carFilters.get(0));
        });
    }
}
