package com.carffeine.carffeine.station.domain.charger;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface ChargerStatusRepository extends Repository<ChargerStatus, ChargerId> {

    List<ChargerStatus> findAll();
}
