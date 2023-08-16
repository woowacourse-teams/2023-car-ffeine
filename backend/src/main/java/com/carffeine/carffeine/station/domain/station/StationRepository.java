package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import org.springframework.data.domain.Page;
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

    Page<Station> findAll(Pageable pageable);

    Page<Station> findAllByStationNameContains(Pageable pageable, String stationName);

    List<Station> findAllByStationNameContainingOrAddressContainingOrderByStationId(String stationName, String address);

    @Query("SELECT DISTINCT s FROM Station s JOIN FETCH s.chargers WHERE s.stationId = :stationId")
    Optional<Station> findFetchByStationId(@Param("stationId") String stationId);


    // 밑에서부터 데모데이용 속도 개선 쿼리

    // 1. fetch join + 회사 이름만 조회 bb
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCompanyNames(Pageable pageable,
                                                      @Param("minLatitude") BigDecimal minLatitude,
                                                      @Param("maxLatitude") BigDecimal maxLatitude,
                                                      @Param("minLongitude") BigDecimal minLongitude,
                                                      @Param("maxLongitude") BigDecimal maxLongitude,
                                                      @Param("companyNames") List<String> companyNames);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCompanyNamesWithPaging(@Param("stationId") String stationId,
                                                                Pageable pageable,
                                                                @Param("minLatitude") BigDecimal minLatitude,
                                                                @Param("maxLatitude") BigDecimal maxLatitude,
                                                                @Param("minLongitude") BigDecimal minLongitude,
                                                                @Param("maxLongitude") BigDecimal maxLongitude,
                                                                @Param("companyNames") List<String> companyNames);

    // 2. fetch join + 충전 타입 bb
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND c.type IN :types " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingTypes(Pageable pageable,
                                               @Param("minLatitude") BigDecimal minLatitude,
                                               @Param("maxLatitude") BigDecimal maxLatitude,
                                               @Param("minLongitude") BigDecimal minLongitude,
                                               @Param("maxLongitude") BigDecimal maxLongitude,
                                               @Param("types") List<ChargerType> types);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND c.type IN :types " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingTypesWithPaging(@Param("stationId") String stationId,
                                                         Pageable pageable,
                                                         @Param("minLatitude") BigDecimal minLatitude,
                                                         @Param("maxLatitude") BigDecimal maxLatitude,
                                                         @Param("minLongitude") BigDecimal minLongitude,
                                                         @Param("maxLongitude") BigDecimal maxLongitude,
                                                         @Param("types") List<ChargerType> types);

    // 3. fetch join + 충전 속도 bb
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND c.capacity IN :capacities " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCapacities(Pageable pageable,
                                                    @Param("minLatitude") BigDecimal minLatitude,
                                                    @Param("maxLatitude") BigDecimal maxLatitude,
                                                    @Param("minLongitude") BigDecimal minLongitude,
                                                    @Param("maxLongitude") BigDecimal maxLongitude,
                                                    @Param("capacities") List<BigDecimal> capacities);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND c.capacity IN :capacities " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCapacitiesWithPaging(@Param("stationId") String stationId,
                                                              Pageable pageable,
                                                              @Param("minLatitude") BigDecimal minLatitude,
                                                              @Param("maxLatitude") BigDecimal maxLatitude,
                                                              @Param("minLongitude") BigDecimal minLongitude,
                                                              @Param("maxLongitude") BigDecimal maxLongitude,
                                                              @Param("capacities") List<BigDecimal> capacities);

    // 4. fetch join + 회사명 + 타입 bb
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "AND c.type IN :types " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCompanyNamesAndTypes(Pageable pageable,
                                                              @Param("minLatitude") BigDecimal minLatitude,
                                                              @Param("maxLatitude") BigDecimal maxLatitude,
                                                              @Param("minLongitude") BigDecimal minLongitude,
                                                              @Param("maxLongitude") BigDecimal maxLongitude,
                                                              @Param("companyNames") List<String> companyNames,
                                                              @Param("types") List<ChargerType> types);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "AND c.type IN :types " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCompanyNamesAndTypesWithPaging(@Param("stationId") String stationId,
                                                                        Pageable pageable,
                                                                        @Param("minLatitude") BigDecimal minLatitude,
                                                                        @Param("maxLatitude") BigDecimal maxLatitude,
                                                                        @Param("minLongitude") BigDecimal minLongitude,
                                                                        @Param("maxLongitude") BigDecimal maxLongitude,
                                                                        @Param("companyNames") List<String> companyNames,
                                                                        @Param("types") List<ChargerType> types);

    // 5. fetch join + 회사명 + 속도 bb
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "AND c.capacity IN :capacities " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCompanyNamesAndCapacities(Pageable pageable,
                                                                   @Param("minLatitude") BigDecimal minLatitude,
                                                                   @Param("maxLatitude") BigDecimal maxLatitude,
                                                                   @Param("minLongitude") BigDecimal minLongitude,
                                                                   @Param("maxLongitude") BigDecimal maxLongitude,
                                                                   @Param("companyNames") List<String> companyNames,
                                                                   @Param("capacities") List<BigDecimal> capacities);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "AND c.capacity IN :capacities " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingCompanyNamesAndCapacitiesWithPaging(@Param("stationId") String stationId,
                                                                             Pageable pageable,
                                                                             @Param("minLatitude") BigDecimal minLatitude,
                                                                             @Param("maxLatitude") BigDecimal maxLatitude,
                                                                             @Param("minLongitude") BigDecimal minLongitude,
                                                                             @Param("maxLongitude") BigDecimal maxLongitude,
                                                                             @Param("companyNames") List<String> companyNames,
                                                                             @Param("capacities") List<BigDecimal> capacities);

    // 6. fetch join + 타입 + 속도
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND c.type IN :types " +
            "AND c.capacity IN :capacities " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingTypesAndCapacities(Pageable pageable,
                                                            @Param("minLatitude") BigDecimal minLatitude,
                                                            @Param("maxLatitude") BigDecimal maxLatitude,
                                                            @Param("minLongitude") BigDecimal minLongitude,
                                                            @Param("maxLongitude") BigDecimal maxLongitude,
                                                            @Param("types") List<ChargerType> types,
                                                            @Param("capacities") List<BigDecimal> capacities);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND c.type IN :types " +
            "AND c.capacity IN :capacities " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingTypesAndCapacitiesWithPaging(@Param("stationId") String stationId,
                                                                      Pageable pageable,
                                                                      @Param("minLatitude") BigDecimal minLatitude,
                                                                      @Param("maxLatitude") BigDecimal maxLatitude,
                                                                      @Param("minLongitude") BigDecimal minLongitude,
                                                                      @Param("maxLongitude") BigDecimal maxLongitude,
                                                                      @Param("types") List<ChargerType> types,
                                                                      @Param("capacities") List<BigDecimal> capacities);

    // 7. fetch join + 모두 존재 bb
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "AND c.capacity IN :capacities " +
            "AND c.type IN :types " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingAllFilters(Pageable pageable,
                                                    @Param("minLatitude") BigDecimal minLatitude,
                                                    @Param("maxLatitude") BigDecimal maxLatitude,
                                                    @Param("minLongitude") BigDecimal minLongitude,
                                                    @Param("maxLongitude") BigDecimal maxLongitude,
                                                    @Param("companyNames") List<String> companyNames,
                                                    @Param("capacities") List<BigDecimal> capacities,
                                                    @Param("types") List<ChargerType> types);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "AND s.companyName IN :companyNames " +
            "AND c.capacity IN :capacities " +
            "AND c.type IN :types " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringBeingAllFiltersWithPaging(@Param("stationId") String stationId,
                                                              Pageable pageable,
                                                              @Param("minLatitude") BigDecimal minLatitude,
                                                              @Param("maxLatitude") BigDecimal maxLatitude,
                                                              @Param("minLongitude") BigDecimal minLongitude,
                                                              @Param("maxLongitude") BigDecimal maxLongitude,
                                                              @Param("companyNames") List<String> companyNames,
                                                              @Param("capacities") List<BigDecimal> capacities,
                                                              @Param("types") List<ChargerType> types);

    // 8. fetch join + 모두 없음 bb
    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringNone(Pageable pageable,
                                         @Param("minLatitude") BigDecimal minLatitude,
                                         @Param("maxLatitude") BigDecimal maxLatitude,
                                         @Param("minLongitude") BigDecimal minLongitude,
                                         @Param("maxLongitude") BigDecimal maxLongitude);

    @Query("SELECT DISTINCT s FROM Station s " +
            "INNER JOIN FETCH s.chargers c " +
            "INNER JOIN FETCH c.chargerStatus " +
            "WHERE s.stationId > :stationId " +
            "AND s.latitude.value BETWEEN :minLatitude AND :maxLatitude " +
            "AND s.longitude.value BETWEEN :minLongitude AND :maxLongitude " +
            "ORDER BY s.stationId")
    List<Station> findAllByFilteringNoneWithPaging(@Param("stationId") String stationId,
                                                   Pageable pageable,
                                                   @Param("minLatitude") BigDecimal minLatitude,
                                                   @Param("maxLatitude") BigDecimal maxLatitude,
                                                   @Param("minLongitude") BigDecimal minLongitude,
                                                   @Param("maxLongitude") BigDecimal maxLongitude);
}
