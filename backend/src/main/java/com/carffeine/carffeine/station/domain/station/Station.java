package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.Charger;
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
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EqualsAndHashCode(of = "stationId")
@Table(name = "charge_station", indexes = @Index(name = "idx_station_coordination", columnList = "latitude, longitude, stationId"))
public class Station {

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
}
