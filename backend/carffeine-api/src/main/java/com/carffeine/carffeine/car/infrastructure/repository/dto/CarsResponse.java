package com.carffeine.carffeine.car.infrastructure.repository.dto;

import com.carffeine.carffeine.car.domain.Car;

import java.util.List;
import java.util.stream.Collectors;

public record CarsResponse(List<CarResponse> cars) {

    public static CarsResponse from(List<Car> cars) {
        return cars.stream()
                .map(CarResponse::from)
                .collect(Collectors.collectingAndThen(Collectors.toList(), CarsResponse::new));
    }
}
