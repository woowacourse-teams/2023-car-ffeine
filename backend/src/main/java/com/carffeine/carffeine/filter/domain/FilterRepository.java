package com.carffeine.carffeine.filter.domain;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface FilterRepository extends Repository<Filter, Long> {

    List<Filter> findAll();

    <S extends Filter> List<S> saveAll(Iterable<S> filters);

    Optional<Filter> findByName(String name);

    void deleteByName(String name);
}
