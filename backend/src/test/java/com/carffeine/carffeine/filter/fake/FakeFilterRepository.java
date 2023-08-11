package com.carffeine.carffeine.filter.fake;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FakeFilterRepository implements FilterRepository {

    private final Map<Long, Filter> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public List<Filter> findAll() {
        return map.values()
                .stream()
                .toList();
    }

    @Override
    public <S extends Filter> List<S> saveAll(final Iterable<S> filters) {
        List<S> addedFilters = new ArrayList<>();

        for (S filter : filters) {
            id++;
            addedFilters.add(filter);
            map.put(id, filter);
        }

        return addedFilters;
    }

    @Override
    public Optional<Filter> findByName(final String name) {
        return map.values()
                .stream()
                .filter(it -> it.getName().equals(name))
                .findAny();
    }

    @Override
    public void deleteByName(final String name) {
        Long key = map.keySet()
                .stream()
                .filter(it -> map.get(it).getName().equals(name))
                .findAny()
                .get();

        map.remove(key);
    }
}
