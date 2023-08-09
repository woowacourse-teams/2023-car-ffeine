package com.carffeine.carffeine.filter.fake;

import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.capacity.CapacityRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeCapacityRepository implements CapacityRepository {

    private final Map<Long, Capacity> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public boolean existsByCapacity(BigDecimal capacity) {
        return map.values()
                .stream()
                .anyMatch(it -> it.getCapacity().equals(capacity));
    }

    @Override
    public List<Capacity> findAll() {
        return new ArrayList<>(map.values());
    }

    @Override
    public <S extends Capacity> List<S> saveAll(Iterable<S> capacities) {
        List<S> savedCapacities = new ArrayList<>();

        for (S capacity : capacities) {
            id++;
            map.put(id, capacity);
            savedCapacities.add(capacity);
        }

        return savedCapacities;
    }
}
