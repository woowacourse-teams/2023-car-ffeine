package com.carffeine.carffeine.domain.chargestation.charger;

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
import javax.persistence.Table;
import java.time.LocalDateTime;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(ChargerId.class)
@Entity
@Table(name = "charger_status")
public class ChargerStatus {

    @Id
    @Column(name = "station_id")
    private String stationId;

    @Id
    @Column(name = "charger_id")
    private String chargerId;

    private LocalDateTime latestUpdateTime;

    @Enumerated(EnumType.STRING)
    private ChargerState chargerState;

    public boolean isAvailable() {
        return chargerState.isStandBy();
    }

}
