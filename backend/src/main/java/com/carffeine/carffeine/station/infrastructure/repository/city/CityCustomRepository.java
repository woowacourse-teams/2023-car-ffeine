package com.carffeine.carffeine.station.infrastructure.repository.city;

import com.carffeine.carffeine.station.domain.city.City;

import java.util.Collection;

public interface CityCustomRepository {

    void saveAll(Collection<City> cities);

    boolean isExist();
}
