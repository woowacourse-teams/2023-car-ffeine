package com.carffeine.carffeine.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(ChargerId.class)
@Entity
public class Charger {

    @Id
    @Column(name = "station_id")
    private String stationId;

    @Id
    @Column(name = "charger_id")
    private String chargerId;

    // 추후에 enum으로 바꿀 수 있으면 바꾸기
    private String type;

    private String price;

    @Column(scale = 2)
    private BigDecimal capacity;

    // 추후 enum으로 바꿀 수 있다면 바꾸기
    private String method;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "fk_station_id"),
            @JoinColumn(name = "fk_charger_id")
    })
    private ChargerStatus chargerStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id", insertable = false, updatable = false)
    private ChargeStation chargeStation;

    public boolean isAvailable() {
        return chargerStatus.isAvailable();
    }
}
