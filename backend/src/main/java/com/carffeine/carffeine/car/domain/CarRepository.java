package com.carffeine.carffeine.car.domain;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends Repository<Car, Long> {

    Optional<Car> findById(Long carId);

    Optional<Car> findByNameAndVintage(String name, String vintage);

    List<Car> findAll();

    boolean existsByNameAndVintage(String name, String vintage);

    Car save(Car car);

    void deleteById(Long id);
}
