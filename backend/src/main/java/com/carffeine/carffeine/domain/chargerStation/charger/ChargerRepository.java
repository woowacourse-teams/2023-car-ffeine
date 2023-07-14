package com.carffeine.carffeine.domain.chargerStation.charger;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ChargerRepository extends Repository<Charger, ChargerId> {

    Optional<Charger> findByChargerIdAndStationId(String chargerId, String stationId);

    Charger save(Charger charger);
}
