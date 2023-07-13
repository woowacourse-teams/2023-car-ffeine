package com.carffeine.carffeine.domain.chargerStation.chargeStation;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ChargeStationRepository extends Repository<ChargeStation, Long> {

    ChargeStation save(ChargeStation chargeStation);

    @EntityGraph(attributePaths = "chargers")
    List<ChargeStation> findAllByLatitudeBetweenAndLongitudeBetween(Latitude minLatitude, Latitude maxLatitude, Longitude minLongitude, Longitude maxLongitude);

    Optional<ChargeStation> findChargeStationByStationId(String stationId);

    @Query("SELECT DISTINCT c FROM ChargeStation c JOIN FETCH c.chargers")
    List<ChargeStation> findAll();
}
