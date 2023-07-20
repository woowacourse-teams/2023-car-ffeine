package com.carffeine.carffeine.domain.chargestation.charger;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
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
import javax.persistence.Table;
import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(ChargerId.class)
@Entity
@Table(name = "charger")
public class Charger {
    private static final BigDecimal OUTPUT_THRESHOLD = BigDecimal.valueOf(50);

    @Id
    @Column(name = "station_id")
    private String stationId;

    @Id
    @Column(name = "charger_id")
    private String chargerId;

    private String type;

    private String address;

    private BigDecimal price;

    @Column(scale = 2)
    private BigDecimal capacity;

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
        if (chargerStatus == null) {
            return false;
        }
        return chargerStatus.isAvailable();
    }

    public boolean isQuick() {
        if (capacity == null) {
            return false;
        }
        return capacity.compareTo(OUTPUT_THRESHOLD) >= 0;
    }
}
