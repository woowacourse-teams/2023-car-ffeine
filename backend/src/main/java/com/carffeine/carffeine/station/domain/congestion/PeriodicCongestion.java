package com.carffeine.carffeine.station.domain.congestion;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.station.config.RequestPeriodConverter;
import com.carffeine.carffeine.station.domain.charger.Charger;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.DayOfWeek;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@EqualsAndHashCode(of = {"id"}, callSuper = false)
@Table(name = "periodic_congestion")
public class PeriodicCongestion extends BaseEntity {

    private static final int DEFAULT_COUNT = 0;
    private static final double DEFAULT_CONGESTIONS = 0;

    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private DayOfWeek dayOfWeek;

    @Convert(converter = RequestPeriodConverter.class)
    @Column(nullable = false, length = 10)
    private RequestPeriod startTime;

    @Column(nullable = false)
    private int useCount;

    @Column(nullable = false)
    private int totalCount;

    @Column(nullable = false)
    private double congestion;

    @ManyToOne
    @JoinColumns(value = {
            @JoinColumn(name = "station_id", referencedColumnName = "station_id", insertable = false, updatable = false),
            @JoinColumn(name = "charger_id", referencedColumnName = "charger_id", insertable = false, updatable = false)
    }, foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT))
    private Charger charger;

    @Column(name = "station_id", nullable = false)
    private String stationId;

    @Column(name = "charger_id", nullable = false)
    private String chargerId;

    public PeriodicCongestion(String id, DayOfWeek dayOfWeek, RequestPeriod startTime, int useCount, int totalCount, double congestion, String stationId, String chargerId) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.useCount = useCount;
        this.totalCount = totalCount;
        this.congestion = congestion;
        this.stationId = stationId;
        this.chargerId = chargerId;
    }

    public static PeriodicCongestion createDefault(DayOfWeek dayOfWeek, RequestPeriod startTime, String stationId, String chargerId) {
        String id = IdGenerator.generateId(dayOfWeek, startTime, stationId, chargerId);

        return new PeriodicCongestion(
                id,
                dayOfWeek,
                startTime,
                DEFAULT_COUNT,
                DEFAULT_COUNT,
                DEFAULT_CONGESTIONS,
                stationId,
                chargerId
        );
    }

    public boolean isSameStartTime(int section) {
        return this.startTime.isSameSection(section);
    }
}
