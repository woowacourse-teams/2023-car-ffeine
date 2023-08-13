package com.carffeine.carffeine.car.domain;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface CarFilterRepository extends Repository<CarFilter, Long> {

    List<CarFilter> findAllByCar(Car car);

    <S extends CarFilter> List<S> saveAll(Iterable<S> carFilters);

    void deleteAllByCar(Car car);
}
