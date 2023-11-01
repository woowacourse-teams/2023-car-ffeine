package com.carffeine.carffeine.filter.fake;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;

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
    public <S extends Filter> List<S> saveAll(Iterable<S> filters) {
        List<S> addedFilters = new ArrayList<>();

        for (S filter : filters) {
            id++;

            Filter newFilter = Filter.builder()
                    .id(id)
                    .name(filter.getName())
                    .filterType(FilterType.from(filter.getFilterType().getName()))
                    .build();

            addedFilters.add((S) newFilter);
            map.put(id, newFilter);
        }

        return addedFilters;
    }

    @Override
    public Optional<Filter> findByName(String name) {
        return map.values()
                .stream()
                .filter(it -> it.getName().equals(name))
                .findAny();
    }

    @Override
    public void deleteById(Long id) {
        map.remove(id);
    }
}
