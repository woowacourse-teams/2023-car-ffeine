package com.carffeine.carffeine.car.service;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.infrastructure.repository.dto.CarResponse;
import com.carffeine.carffeine.car.infrastructure.repository.dto.CarsResponse;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.car.fixture.CarFixture.createCar;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CarQueryServiceTest extends IntegrationTest {

    @Autowired
    private CarQueryService carQueryService;

    @Autowired
    private CarRepository carRepository;

    @Test
    void 차량을_모두_조회한다() {
        // given
        Car car = carRepository.save(createCar());

        // when
        CarsResponse result = carQueryService.findAllCars();

        // then
        assertThat(result).usingRecursiveComparison().isEqualTo(new CarsResponse(List.of(new CarResponse(car.getId(), car.getName(), car.getVintage()))));
    }
}
