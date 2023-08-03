package com.carffeine.carffeine.station.domain.station;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface StationRepository extends Repository<Station, Long> {

    Station save(Station station);

    @EntityGraph(attributePaths = {"chargers", "chargers.chargerStatus"})
    List<Station> findAllByLatitudeBetweenAndLongitudeBetween(Latitude minLatitude, Latitude maxLatitude, Longitude minLongitude, Longitude maxLongitude);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value >= :minLatitude AND s.latitude.value <= :maxLatitude " +
            "AND s.longitude.value >= :minLongitude AND s.longitude.value <= :maxLongitude")
    List<Station> findAllFetchByLatitudeBetweenAndLongitudeBetween(@Param("minLatitude") BigDecimal minLatitude,
                                                                   @Param("maxLatitude") BigDecimal maxLatitude,
                                                                   @Param("minLongitude") BigDecimal minLongitude,
                                                                   @Param("maxLongitude") BigDecimal maxLongitude);

    @EntityGraph(attributePaths = {"chargers", "chargers.chargerStatus", "faultReports"})
    Optional<Station> findChargeStationByStationId(String stationId);

    @Query("SELECT DISTINCT s FROM Station s JOIN FETCH s.chargers")
    List<Station> findAllFetch();

    List<Station> findAll();

    List<Station> findAllByStationNameContainingOrAddressContainingOrderByStationId(String stationName, String address);

    @Query("SELECT s FROM Station s LEFT JOIN FETCH s.chargers WHERE s.stationId > :stationId ORDER BY s.stationId")
    List<Station> findAllByPaging(@Param("stationId") String stationId, Pageable pageable);

    @Query("SELECT s FROM Station s LEFT JOIN FETCH s.chargers ORDER BY s.stationId")
    List<Station> findAllByOrder(Pageable pageable);
}
