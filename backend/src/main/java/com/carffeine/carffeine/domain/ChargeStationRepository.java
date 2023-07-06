package com.carffeine.carffeine.domain;

import org.springframework.data.repository.Repository;

public interface ChargeStationRepository extends Repository<ChargeStation, Long> {

    ChargeStation save(ChargeStation chargeStation);
}
