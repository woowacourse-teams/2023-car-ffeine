package com.carffeine.carffeine.station.infrastructure.repository.station;

import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static com.carffeine.carffeine.station.domain.charger.QCharger.charger;
import static com.carffeine.carffeine.station.domain.charger.QChargerStatus.chargerStatus;
import static com.carffeine.carffeine.station.domain.report.QFaultReport.faultReport;
import static com.carffeine.carffeine.station.domain.station.QStation.station;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.querydsl.core.types.Projections.constructor;
import static com.querydsl.core.types.dsl.Expressions.cases;

@RequiredArgsConstructor
@Repository
public class StationQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Optional<StationSpecificResponse> findStationById(String stationId) {
        List<StationSpecificResponse> result = jpaQueryFactory.selectFrom(station)
                .leftJoin(station.faultReports, faultReport)
                .innerJoin(station.chargers, charger)
                .innerJoin(charger.chargerStatus, chargerStatus)
                .where(station.stationId.eq(stationId))
                .groupBy(charger.chargerId)
                .transform(
                        groupBy(station.stationId)
                                .list(constructor(StationSpecificResponse.class,
                                        station.stationId,
                                        station.stationName,
                                        station.companyName,
                                        station.address,
                                        station.contact,
                                        station.isParkingFree,
                                        station.operatingTime,
                                        station.detailLocation,
                                        station.latitude.value,
                                        station.longitude.value,
                                        station.isPrivate,
                                        station.stationState,
                                        station.privateReason,
                                        faultReport.id.count(),
                                        list(
                                                constructor(
                                                        ChargerSpecificResponse.class,
                                                        charger.type,
                                                        charger.price,
                                                        charger.capacity,
                                                        chargerStatus.latestUpdateTime,
                                                        chargerStatus.chargerCondition,
                                                        charger.method
                                                )
                                        )
                                ))
                );

        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    public List<String> findStationIdsByCoordinate(
            BigDecimal minLatitude,
            BigDecimal maxLatitude,
            BigDecimal minLongitude,
            BigDecimal maxLongitude,
            List<String> companyNames,
            List<ChargerType> chargerTypes,
            List<BigDecimal> capacities
    ) {
        return jpaQueryFactory.select(
                        station.stationId
                ).from(station)
                .innerJoin(charger)
                .on(charger.stationId.eq(station.stationId))
                .where(
                        station.latitude.value.goe(minLatitude),
                        station.latitude.value.loe(maxLatitude),
                        station.longitude.value.goe(minLongitude),
                        station.longitude.value.loe(maxLongitude),
                        eqCapacities(capacities),
                        eqChargerTypes(chargerTypes),
                        eqCompanyNames(companyNames)
                )
                .distinct()
                .fetch();
    }

    public List<StationSimpleResponse> findStationByStationIds(List<String> stationIds) {
        return jpaQueryFactory
                .select(constructor(StationSimpleResponse.class,
                        station.stationId,
                        station.stationName,
                        station.latitude.value,
                        station.longitude.value,
                        station.isParkingFree,
                        station.isPrivate,
                        chargerStatus.chargerCondition
                                .when(ChargerCondition.STANDBY).then(1L).otherwise(0L).sum(),
                        cases()
                                .when(charger.capacity.goe(BigDecimal.valueOf(50.0)))
                                .then(1L)
                                .otherwise(0L)
                                .sum()
                ))
                .from(station)
                .innerJoin(charger)
                .on(charger.stationId.eq(station.stationId))
                .innerJoin(chargerStatus)
                .on(charger.station.stationId.eq(chargerStatus.stationId)
                        .and(charger.chargerId.eq(chargerStatus.chargerId)))
                .where(station.stationId.in(stationIds))
                .groupBy(station.stationId)
                .fetch();
    }

    public List<StationSummaryResponse> findStationsSummary(List<String> stationIds) {
        return jpaQueryFactory.select(constructor(StationSummaryResponse.class,
                        station.stationId,
                        station.companyName,
                        station.stationName,
                        station.address,
                        station.operatingTime,
                        station.isParkingFree,
                        station.isPrivate,
                        station.latitude.value,
                        station.longitude.value,
                        cases()
                                .when(charger.capacity.goe(BigDecimal.valueOf(50.0)))
                                .then(1L)
                                .otherwise(0L)
                                .sum()
                )).from(station)
                .innerJoin(charger)
                .on(charger.stationId.eq(station.stationId))
                .where(station.stationId.in(stationIds))
                .groupBy(station.stationId)
                .fetch();
    }

    private BooleanExpression eqCompanyNames(List<String> companyNames) {
        return companyNames.isEmpty() ? null : station.companyName.in(companyNames);
    }

    private BooleanExpression eqChargerTypes(List<ChargerType> chargerTypes) {
        return chargerTypes.isEmpty() ? null : charger.type.in(chargerTypes);
    }

    private BooleanExpression eqCapacities(List<BigDecimal> capacities) {
        return capacities.isEmpty() ? null : charger.capacity.in(capacities);
    }
}
