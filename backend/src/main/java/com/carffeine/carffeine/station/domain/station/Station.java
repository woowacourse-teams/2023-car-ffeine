package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EqualsAndHashCode(of = "stationId", callSuper = false)
@Table(name = "charge_station", indexes = @Index(name = "idx_station_coordination", columnList = "latitude, longitude, stationId"))
public class Station extends BaseEntity {

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

    public void update(Station updatedStation) {
        this.stationName = updatedStation.stationName;
        this.companyName = updatedStation.companyName;
        this.address = updatedStation.address;
        this.isParkingFree = updatedStation.isParkingFree;
        this.operatingTime = updatedStation.operatingTime;
        this.detailLocation = updatedStation.detailLocation;
        this.latitude = updatedStation.latitude;
        this.longitude = updatedStation.longitude;
        this.isPrivate = updatedStation.isPrivate;
        this.contact = updatedStation.contact;
        this.stationState = updatedStation.stationState;
        this.privateReason = updatedStation.privateReason;
    }
}
