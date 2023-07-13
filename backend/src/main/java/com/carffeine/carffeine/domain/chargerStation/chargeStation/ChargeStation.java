package com.carffeine.carffeine.domain.chargerStation.chargeStation;

import com.carffeine.carffeine.domain.chargerStation.charger.Charger;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ChargeStation {

    @Id
    private String stationId;

    private String stationName;

    private String companyName;

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
    @OneToMany(mappedBy = "chargeStation", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Charger> chargers = new ArrayList<>();

    public void setChargers(List<Charger> chargers) {
        this.chargers = chargers;
    }

    public int getTotalCount() {
        return chargers.size();
    }

    public int getAvailableCount() {
        return (int) chargers.stream()
                .filter(Charger::isAvailable)
                .count();
    }

    public boolean isUpdated(final ChargeStation station) {
        if (!stationName.equals(station.stationName)) {
            return true;
        }

        if (!companyName.equals(station.companyName)) {
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

        if (!latitude.getValue().equals(station.getLatitude().getValue())) {
            return true;
        }

        if (!longitude.getValue().equals(station.longitude.getValue())) {
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

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (!(o instanceof ChargeStation that)) return false;
        return Objects.equals(stationId, that.stationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(stationId);
    }
}
