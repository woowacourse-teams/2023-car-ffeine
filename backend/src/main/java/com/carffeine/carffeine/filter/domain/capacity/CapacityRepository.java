package com.carffeine.carffeine.filter.domain.capacity;

import org.springframework.data.repository.Repository;

import java.math.BigDecimal;
import java.util.List;

public interface CapacityRepository extends Repository<Capacity, Long> {

    boolean existsByCapacity(BigDecimal capacity);

    List<Capacity> findAll();

    <S extends Capacity> List<S> saveAll(Iterable<S> entities);
}
