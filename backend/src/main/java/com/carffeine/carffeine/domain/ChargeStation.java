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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ChargeStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stationId;

    private String stationName;

    private String companyName;

    private Boolean isParkingFree;

    private String operatingTime;

    private String detailLocation;

    @Column(scale = 7, precision = 13)
    private BigDecimal latitude;

    @Column(scale = 7, precision = 13)
    private BigDecimal longitude;

    private Boolean isPrivate;

    private String contact;

    private String stationState;

    private String privateReason;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "station_id")
    private List<Charger> chargers;

    public ChargeStation(
            String stationId,
            String stationName,
            String companyName,
            Boolean isParkingFree,
            String operatingTime,
            String detailLocation,
            BigDecimal latitude,
            BigDecimal longitude,
            Boolean isPrivate,
            String contact,
            String stationState,
            String privateReason,
            List<Charger> chargers
    ) {
        this.stationId = stationId;
        this.stationName = stationName;
        this.companyName = companyName;
        this.isParkingFree = isParkingFree;
        this.operatingTime = operatingTime;
        this.detailLocation = detailLocation;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isPrivate = isPrivate;
        this.contact = contact;
        this.stationState = stationState;
        this.privateReason = privateReason;
        this.chargers = chargers;
    }

    public void setChargers(List<Charger> chargers) {
        this.chargers = chargers;
    }
}
