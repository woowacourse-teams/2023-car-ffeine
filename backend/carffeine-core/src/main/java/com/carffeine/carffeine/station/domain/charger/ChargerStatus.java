package com.carffeine.carffeine.station.domain.charger;

import com.carffeine.carffeine.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.time.LocalDateTime;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(ChargerId.class)
@Entity
public class ChargerStatus extends BaseEntity {

    @Id
    @Column(name = "station_id")
    private String stationId;

    @Id
    @Column(name = "charger_id")
    private String chargerId;

    @Column(length = 30)
    private LocalDateTime latestUpdateTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ChargerCondition chargerCondition;

    public boolean isAvailable() {
        return chargerCondition.isStandBy();
    }

    public boolean isUsing() {
        return chargerCondition == ChargerCondition.CHARGING_IN_PROGRESS;
    }
}
