package com.carffeine.carffeine.station.domain.charger;

import com.carffeine.carffeine.station.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;
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

    private LocalDateTime latestUpdateTime;

    @Enumerated(EnumType.STRING)
    private ChargerCondition chargerCondition;

    public boolean isAvailable() {
        return chargerCondition.isStandBy();
    }

    public boolean isUsing() {
        return chargerCondition == ChargerCondition.CHARGING_IN_PROGRESS;
    }
}
