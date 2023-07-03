package com.carffeine.carffeine.domain;

import java.util.List;

import org.springframework.data.repository.Repository;

public interface ChargeStationRepository extends Repository<ChargeStation,Long> {

	List<ChargeStation> findAll();

	ChargeStation save(ChargeStation chargeStation);
}
