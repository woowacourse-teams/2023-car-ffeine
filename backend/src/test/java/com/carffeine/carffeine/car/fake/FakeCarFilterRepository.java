package com.carffeine.carffeine.car.fake;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilter;
import com.carffeine.carffeine.car.domain.CarFilterRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeCarFilterRepository implements CarFilterRepository {

    private final Map<Long, CarFilter> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public List<CarFilter> findAllByCar(Car car) {
        return map.values()
                .stream()
                .toList();
    }

    @Override
    public <S extends CarFilter> List<S> saveAll(Iterable<S> carFilters) {
        List<S> savedCarFilters = new ArrayList<>();

        for (S carFilter : carFilters) {
            id++;
            CarFilter savedCarFilter = CarFilter.builder()
                    .id(id)
                    .car(carFilter.getCar())
                    .filter(carFilter.getFilter())
                    .build();
            map.put(id, savedCarFilter);

            savedCarFilters.add((S) savedCarFilter);
        }

        return savedCarFilters;
    }

    @Override
    public void deleteAllByCar(Car car) {
        List<Long> keys = map.keySet()
                .stream()
                .filter(it -> map.get(it).getCar().equals(car))
                .toList();

        for (Long key : keys) {
            map.remove(key);
        }
    }
}
