package com.carffeine.carffeine.station.domain.charger;

import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ChargerRepository extends Repository<Charger, String> {

    List<Charger> findAllByStationId(String stationId);

    Optional<Charger> findByChargerIdAndStationId(String chargerId, String stationId);

    Charger save(Charger charger);
}
