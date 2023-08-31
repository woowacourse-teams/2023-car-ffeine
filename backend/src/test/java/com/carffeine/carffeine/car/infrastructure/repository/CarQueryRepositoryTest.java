package com.carffeine.carffeine.car.infrastructure.repository;

import com.carffeine.carffeine.car.controller.dto.CarsResponse;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.config.QuerydslConfig;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@Import(value = {QuerydslConfig.class, CarQueryRepository.class})
@DataJpaTest
class CarQueryRepositoryTest {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarQueryRepository carQueryRepository;

    @Test
    void 차량을_모두_조회한다() {
        // given
        Car car1 = carRepository.save(Car.from("아이오닉5", "2023"));
        Car car2 = carRepository.save(Car.from("아이오닉6", "2023"));

        // when
        CarsResponse result = carQueryRepository.findAllCars();

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.cars().get(0).name()).isEqualTo(car1.getName());
            softly.assertThat(result.cars().get(1).name()).isEqualTo(car2.getName());
        });
    }
}
