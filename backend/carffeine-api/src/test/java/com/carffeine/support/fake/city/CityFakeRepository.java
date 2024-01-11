package com.carffeine.support.fake.city;

import com.carffeine.carffeine.city.domain.City;
import com.carffeine.carffeine.city.domain.CityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class CityFakeRepository implements CityRepository {

    private final Map<Long, City> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public Page<City> findAll(Pageable pageable) {
        ArrayList<City> cities = new ArrayList<>(map.values());

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), cities.size());
        List<City> pagedStations = cities.subList(start, end);
        return new PageImpl<>(pagedStations, pageable, cities.size());
    }

    @Override
    public Optional<City> findById(final Long id) {
        return Optional.ofNullable(map.get(id));
    }

    @Override
    public City save(final City city) {
        this.id++;

        City savedCity = City.builder()
                .id(id)
                .name(city.getName())
                .latitude(city.getLatitude())
                .longitude(city.getLongitude())
                .build();

        map.put(id, savedCity);
        return savedCity;
    }

    @Override
    public void deleteById(final Long id) {
        map.remove(id);
    }
}
