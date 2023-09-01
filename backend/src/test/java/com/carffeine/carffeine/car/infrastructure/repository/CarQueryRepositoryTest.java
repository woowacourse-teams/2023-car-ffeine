package com.carffeine.carffeine.car.infrastructure.repository;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.infrastructure.repository.dto.CarResponse;
import com.carffeine.carffeine.config.QuerydslConfig;
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
        List<CarResponse> result = carQueryRepository.findAllCars();

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(2);
            softly.assertThat(result.get(0).carId()).isEqualTo(car1.getId());
            softly.assertThat(result.get(0).name()).isEqualTo(car1.getName());
            softly.assertThat(result.get(0).vintage()).isEqualTo(car1.getVintage());
            softly.assertThat(result.get(1).carId()).isEqualTo(car2.getId());
            softly.assertThat(result.get(1).name()).isEqualTo(car2.getName());
            softly.assertThat(result.get(1).vintage()).isEqualTo(car2.getVintage());
        });
    }
}
