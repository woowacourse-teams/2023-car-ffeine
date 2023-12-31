package com.carffeine.carffeine.station.domain.charger;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.station.domain.station.Station;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
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
@Table(name = "charger", indexes = {@Index(name = "idx_charger_station_id", columnList = "station_id")})
public class Charger extends BaseEntity {

    private static final BigDecimal OUTPUT_THRESHOLD = BigDecimal.valueOf(50);

    @Id
    @Column(name = "station_id")
    private String stationId;

    @Id
    @Column(name = "charger_id")
    private String chargerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ChargerType type;

    private BigDecimal price;

    @Column(scale = 2)
    private BigDecimal capacity;
    @Column(length = 15)
    private String method;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "station_id"),
            @JoinColumn(name = "charger_id")
    })
    private ChargerStatus chargerStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id", insertable = false, updatable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Station station;

    public boolean isAvailable() {
        if (chargerStatus == null) {
            return false;
        }
        return chargerStatus.isAvailable();
    }

    public boolean isQuick() {
        BigDecimal capacity = this.capacity;
        if (capacity == null) {
            capacity = type.getDefaultCapacity();
        }
        return capacity.compareTo(OUTPUT_THRESHOLD) >= 0;
    }

    public BigDecimal getCapacity() {
        if (capacity == null) {
            return type.getDefaultCapacity();
        }
        return capacity;
    }

    public boolean isUpdated(Charger charger) {
        if (!this.type.equals(charger.type)) {
            return true;
        }

        if (this.capacity != null && this.capacity.compareTo(charger.capacity) != 0) {
            return true;
        }

        return !this.method.equals(charger.method);
    }
}
