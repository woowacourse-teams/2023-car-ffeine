package com.carffeine.carffeine.city.domain;

import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id", callSuper = false)
@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Embedded
    private Latitude latitude;

    @Embedded
    private Longitude longitude;

    public City(String name, Latitude latitude, Longitude longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public City update(String name, BigDecimal latitude, BigDecimal longitude) {
        this.name = name;
        this.latitude = Latitude.from(latitude);
        this.longitude = Longitude.from(longitude);
        return this;
    }
}
