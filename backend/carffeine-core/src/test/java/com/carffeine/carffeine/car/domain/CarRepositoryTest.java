package com.carffeine.carffeine.car.domain;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CarRepositoryTest extends IntegrationTest {

    @Autowired
    private CarRepository carRepository;

    private Car savedCar;

    @BeforeEach
    void setup() {
        savedCar = carRepository.save(Car.from("아이오닉5", "2022-A"));
    }

    @Test
    void 차량을_id_찾는다() {
        // when
        Car foundCar = carRepository.findById(savedCar.getId()).get();

        // then
        assertThat(foundCar.getName()).isEqualTo("아이오닉5");
    }

    @Test
    void 차량의_이름과_연식으로_찾는다() {
        // when
        Car foundCar = carRepository.findByNameAndVintage("아이오닉5", "2022-A").get();

        // then
        assertThat(foundCar.getName()).isEqualTo("아이오닉5");
    }

    @Test
    void 차량을_모두_찾는다() {
        // when
        carRepository.save(Car.from("아이오닉5", "2022-B"));
        List<Car> cars = carRepository.findAll();

        // then
        assertThat(cars.size()).isEqualTo(2);
    }

    @Test
    void 차량의_이름과_연식으로_존재하는지_찾는다() {
        // when
        boolean isExistedCar = carRepository.existsByNameAndVintage("아이오닉5", "2022-A");

        // then
        assertThat(isExistedCar).isTrue();
    }

    @Test
    void 차량을_저장한다() {
        // when
        Car savedCar = carRepository.save(Car.from("아이오닉5", "2022-C"));

        // then
        Car car = carRepository.findById(savedCar.getId()).get();
        assertThat(car.getVintage()).isEqualTo(savedCar.getVintage());
    }

    @Test
    void 차량을_제거한다() {
        // when
        carRepository.deleteById(1L);

        // then
        assertThat(carRepository.findAll().size()).isEqualTo(0);
    }
}
