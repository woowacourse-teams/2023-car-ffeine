package com.carffeine.carffeine.car.infrastructure.repository;

import com.carffeine.carffeine.car.infrastructure.repository.dto.CarResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.carffeine.carffeine.car.domain.QCar.car;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class CarQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<CarResponse> findAllCars() {
        return jpaQueryFactory.select(
                        constructor(CarResponse.class,
                                car.id,
                                car.name,
                                car.vintage
                        )
                ).from(car)
                .fetch();
    }
}
