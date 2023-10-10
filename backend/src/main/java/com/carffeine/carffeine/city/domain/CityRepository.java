package com.carffeine.carffeine.city.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface CityRepository extends Repository<City, Long> {

    Page<City> findAll(Pageable pageable);

    Optional<City> findById(Long id);

    City save(City city);

    void deleteById(Long id);
}
