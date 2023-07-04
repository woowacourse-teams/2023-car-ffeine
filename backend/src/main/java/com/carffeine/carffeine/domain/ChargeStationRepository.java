package com.carffeine.carffeine.domain;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface ChargeStationRepository extends Repository<ChargeStation, Long> {

    List<ChargeStation> findAll();

    ChargeStation save(ChargeStation chargeStation);
}
