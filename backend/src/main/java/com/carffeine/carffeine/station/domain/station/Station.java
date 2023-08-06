package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.BaseTime;
import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EqualsAndHashCode(of = "stationId")
@Table(name = "charge_station", indexes = @Index(name = "idx_station_coordination", columnList = "latitude, longitude, stationId"))
public class Station extends BaseTime {

    @Id
    private String stationId;

    private String stationName;

    private String companyName;

    private String address;

    private Boolean isParkingFree;

    private String operatingTime;

    private String detailLocation;

    private Latitude latitude;

    private Longitude longitude;

    private Boolean isPrivate;

    private String contact;

    private String stationState;

    private String privateReason;

    @Builder.Default
    @OneToMany(mappedBy = "station", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Charger> chargers = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "station", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<FaultReport> faultReports = new HashSet<>();

    public int getTotalCount() {
        return chargers.size();
    }

    public int getAvailableCount() {
        return (int) chargers.stream()
                .filter(Charger::isAvailable)
                .count();
    }

    public void setChargers(List<Charger> chargers) {
        this.chargers = chargers;
    }

    public boolean isUpdated(Station station) {
        if (!stationName.equals(station.stationName)) {
            return true;
        }

        if (!companyName.equals(station.companyName)) {
            return true;
        }

        if (!address.equals(station.address)) {
            return true;
        }

        if (!isParkingFree.equals(station.isParkingFree)) {
            return true;
        }

        if (!operatingTime.equals(station.operatingTime)) {
            return true;
        }

        if (!detailLocation.equals(station.detailLocation)) {
            return true;
        }

        if (!latitude.equals(station.getLatitude())) {
            return true;
        }

        if (!longitude.equals(station.longitude)) {
            return true;
        }

        if (!isPrivate.equals(station.isPrivate)) {
            return true;
        }

        if (!contact.equals(station.contact)) {
            return true;
        }

        if (!stationState.equals(station.stationState)) {
            return true;
        }

        if (!privateReason.equals(station.privateReason)) {
            return true;
        }

        return false;
    }

    public Integer getReportCount() {
        return faultReports.size();
    }
}
