package com.carffeine.carffeine.city.infrastructure.repository;

import com.carffeine.carffeine.city.domain.City;

import java.util.Collection;

public interface CityCustomRepository {

    void saveAll(Collection<City> cities);

    boolean isExist();
}
