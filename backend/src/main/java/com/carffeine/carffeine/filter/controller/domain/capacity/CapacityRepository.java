package com.carffeine.carffeine.filter.controller.domain.capacity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;

public interface CapacityRepository extends JpaRepository<Capacity, Long> {

    boolean existsByCapacity(BigDecimal capacity);
}
