package com.carffeine.carffeine.domain.chargerStation.charger;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface ChargerRepository extends Repository<Charger, String> {
    List<Charger> findAllByStationId(String stationId);
}
