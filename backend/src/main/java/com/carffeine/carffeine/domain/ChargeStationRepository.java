package com.carffeine.carffeine.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface ChargeStationRepository extends JpaRepository<ChargeStation, Long> {

    List<ChargeStation> findAll();

    ChargeStation save(ChargeStation chargeStation);

//    void save(List<ChargeStation> chargeStations1);
}
