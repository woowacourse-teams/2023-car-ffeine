package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.station.controller.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.station.domain.charger.QCharger.charger;
import static com.carffeine.carffeine.station.domain.charger.QChargerStatus.chargerStatus;
import static com.carffeine.carffeine.station.domain.station.QStation.station;
import static com.querydsl.core.group.GroupBy.sum;
import static com.querydsl.core.types.Projections.constructor;
import static com.querydsl.core.types.dsl.Expressions.cases;

@RequiredArgsConstructor
@Repository
public class StationQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<StationSimpleResponse> findAllFetchByLatitudeBetweenAndLongitudeBetween(
            BigDecimal minLatitude, BigDecimal maxLatitude,
            BigDecimal minLongitude, BigDecimal maxLongitude) {

        return jpaQueryFactory
                .select(constructor(StationSimpleResponse.class,
                        station.stationId,
                        station.stationName,
                        station.companyName,
                        station.address,
                        station.isParkingFree,
                        station.operatingTime,
                        station.detailLocation,
                        station.latitude.value,
                        station.longitude.value,
                        station.isPrivate,
                        sum(cases().when(charger.capacity.goe(BigDecimal.valueOf(50.00))).then(1L).otherwise(0L)),
                        charger.count(),
                        sum(cases().when(chargerStatus.chargerCondition.eq(ChargerCondition.STANDBY)).then(1L).otherwise(0L))
                ))
                .from(station)
                .innerJoin(station.chargers, charger)
                .innerJoin(charger.chargerStatus, chargerStatus)
                .where(
                        station.latitude.value.goe(minLatitude),
                        station.latitude.value.loe(maxLatitude),
                        station.longitude.value.goe(minLongitude),
                        station.longitude.value.loe(maxLongitude)
                )
                .groupBy(
                        station.stationId,
                        station.stationName,
                        station.companyName,
                        station.address,
                        station.isParkingFree,
                        station.operatingTime,
                        station.detailLocation,
                        station.latitude.value,
                        station.longitude.value,
                        station.isPrivate,
                        charger.capacity,
                        chargerStatus.chargerCondition
                )
                .fetch();

    }
}
