package com.carffeine.carffeine.station.infrastructure.repository.charger;

import com.carffeine.carffeine.station.infrastructure.repository.charger.dto.ChargerStatusResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.carffeine.carffeine.station.domain.charger.QChargerStatus.chargerStatus;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class ChargerStatusQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<ChargerStatusResponse> findAllChargerStatus(String stationId, String chargerId, long limit) {
        return jpaQueryFactory.select(constructor(ChargerStatusResponse.class,
                        chargerStatus.stationId,
                        chargerStatus.chargerId,
                        chargerStatus.chargerCondition))
                .from(chargerStatus)
                .where(stationIdAndChargerIdGt(stationId, chargerId))
                .orderBy(chargerStatus.stationId.asc(), chargerStatus.chargerId.asc())
                .limit(limit)
                .fetch();
    }

    private BooleanExpression stationIdAndChargerIdGt(String stationId, String chargerId) {
        if (stationId == null || chargerId == null) {
            return null;
        }

        return chargerStatus.stationId.eq(stationId)
                .and(chargerStatus.chargerId.gt(chargerId))
                .or(chargerStatus.stationId.gt(stationId));
    }
}
