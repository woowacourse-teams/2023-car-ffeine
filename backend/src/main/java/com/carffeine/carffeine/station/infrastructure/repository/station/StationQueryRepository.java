package com.carffeine.carffeine.station.infrastructure.repository.station;

import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.carffeine.carffeine.station.domain.charger.QCharger.charger;
import static com.carffeine.carffeine.station.domain.charger.QChargerStatus.chargerStatus;
import static com.carffeine.carffeine.station.domain.report.QFaultReport.faultReport;
import static com.carffeine.carffeine.station.domain.station.QStation.station;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.querydsl.core.types.Projections.constructor;

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
}
