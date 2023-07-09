package com.carffeine.carffeine.domain;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface ChargeStationRepository extends Repository<ChargeStation, Long> {

    ChargeStation save(ChargeStation chargeStation);

    @EntityGraph(attributePaths = "chargers")
    List<ChargeStation> findAllByLatitudeBetweenAndLongitudeBetween(Latitude minLatitude, Latitude maxLatitude, Longitude minLongitude, Longitude maxLongitude);
}
