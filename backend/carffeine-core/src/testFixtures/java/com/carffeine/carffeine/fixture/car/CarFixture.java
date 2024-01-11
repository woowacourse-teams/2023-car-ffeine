package com.carffeine.carffeine.fixture.car;

import com.carffeine.carffeine.car.domain.Car;

public class CarFixture {

    public static Car createCar() {
        return Car.builder()
                .id(1L)
                .name("아이오닉5")
                .vintage("2022-A")
                .build();
    }

    public static Car createOtherCar() {
        return Car.builder()
                .id(2L)
                .name("아이오닉5")
                .vintage("2022-B")
                .build();
    }
}
