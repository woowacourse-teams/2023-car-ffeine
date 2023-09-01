package com.carffeine.carffeine.car.service;

import com.carffeine.carffeine.car.infrastructure.dto.CarsResponse;
import com.carffeine.carffeine.car.infrastructure.repository.CarQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CarQueryService {

    private final CarQueryRepository carQueryRepository;

    public CarsResponse findAllCars() {
        return new CarsResponse(carQueryRepository.findAllCars());
    }
}
