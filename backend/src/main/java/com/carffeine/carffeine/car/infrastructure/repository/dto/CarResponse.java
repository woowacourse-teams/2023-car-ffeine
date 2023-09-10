package com.carffeine.carffeine.car.infrastructure.repository.dto;

import com.carffeine.carffeine.car.domain.Car;

public record CarResponse(
        Long carId,
        String name,
        String vintage
) {

    public static CarResponse from(Car car) {
        return new CarResponse(
                car.getId(),
                car.getName(),
                car.getVintage()
        );
    }
}
