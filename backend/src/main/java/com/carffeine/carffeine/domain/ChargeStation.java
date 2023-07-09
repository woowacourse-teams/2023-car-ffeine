package com.carffeine.carffeine.domain;

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
}
