package com.carffeine.carffeine.car.fake;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakeCarRepository implements CarRepository {

    private final Map<Long, Car> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public Optional<Car> findById(Long carId) {
        return Optional.of(map.get(id));
    }

    @Override
    public List<Car> findAll() {
        return map.values()
                .stream()
                .toList();
    }

    @Override
    public boolean existsByNameAndVintage(String name, String vintage) {
        return map.values()
                .stream()
                .anyMatch(it -> it.getName().equals(name) && it.getVintage().equals(vintage));
    }

    @Override
    public Car save(Car car) {
        this.id++;

        Car savedCar = Car
                .builder()
                .id(this.id)
                .name(car.getName())
                .vintage(car.getVintage())
                .build();

        map.put(this.id, savedCar);
        return car;
    }

    @Override
    public void deleteById(Long id) {
        boolean isExistedCar = map.values()
                .stream()
                .anyMatch(it -> it.getId().equals(id));

        if (isExistedCar) {
            map.remove(id);
            this.id--;
        }
    }
}
