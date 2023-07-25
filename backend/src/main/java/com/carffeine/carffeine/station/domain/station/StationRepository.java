package com.carffeine.carffeine.station.domain.station;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface StationRepository extends Repository<Station, Long> {

    Station save(Station station);

    @EntityGraph(attributePaths = {"chargers", "chargers.chargerStatus"})
    List<Station> findAllByLatitudeBetweenAndLongitudeBetween(Latitude minLatitude, Latitude maxLatitude, Longitude minLongitude, Longitude maxLongitude);

    Optional<Station> findChargeStationByStationId(String stationId);

    @Query("SELECT DISTINCT s FROM Station s JOIN FETCH s.chargers")
    List<Station> findAllFetch();

    List<Station> findAll();
}
