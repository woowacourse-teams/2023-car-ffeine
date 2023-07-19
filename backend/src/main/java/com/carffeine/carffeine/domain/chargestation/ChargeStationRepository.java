package com.carffeine.carffeine.domain.chargestation;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface ChargeStationRepository extends Repository<ChargeStation, Long> {

    ChargeStation save(ChargeStation chargeStation);

    @EntityGraph(attributePaths = {"chargers", "chargers.chargerStatus"})
    List<ChargeStation> findAllByLatitudeBetweenAndLongitudeBetween(Latitude minLatitude, Latitude maxLatitude, Longitude minLongitude, Longitude maxLongitude);

    Optional<ChargeStation> findChargeStationByStationId(String stationId);
}
