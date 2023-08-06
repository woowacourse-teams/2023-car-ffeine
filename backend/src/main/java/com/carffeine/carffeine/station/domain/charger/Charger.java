package com.carffeine.carffeine.station.domain.charger;

import com.carffeine.carffeine.station.domain.BaseTime;
import com.carffeine.carffeine.station.domain.station.Station;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(ChargerId.class)
@Entity
@Table(name = "charger")
public class Charger extends BaseTime {

    private static final BigDecimal OUTPUT_THRESHOLD = BigDecimal.valueOf(50);

    @Id
    @Column(name = "station_id")
    private String stationId;

    @Id
    @Column(name = "charger_id")
    private String chargerId;

    @Enumerated(EnumType.STRING)
    private ChargerType type;

    private BigDecimal price;

    @Column(scale = 2)
    private BigDecimal capacity;

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

    public boolean isUpdated(final Charger charger) {
        if (!this.type.equals(charger.type)) {
            return true;
        }

        if (this.capacity != null && this.capacity.compareTo(charger.capacity) != 0) {
            return true;
        }

        if (!this.method.equals(charger.method)) {
            return true;
        }

        return false;
    }
}
