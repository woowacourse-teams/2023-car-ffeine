package com.carffeine.carffeine.station.domain.city;

import java.util.Collection;

public interface CityCustomRepository {

    void saveAll(Collection<City> cities);

    boolean isExistAlready();
}
