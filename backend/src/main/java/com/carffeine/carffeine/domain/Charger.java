package com.carffeine.carffeine.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@IdClass(ChargerId.class)
public class Charger {

    @Id
    @Column(name = "station_id")
    private String stationId;

    @Id
    @Column(name = "charger_id")
    private String chargerId;

    // 추후에 enum으로 바꿀 수 있으면 바꾸기
    private String type;

    // issue 추후에 가격은 직접 조사 후 채우기
    // private String price;

    private LocalDateTime latestEndTime;

    private LocalDateTime startTimeWhenCharging;

    private String state;

    @Column(scale = 2)
    private BigDecimal capacity;

    // 추후 enum으로 바꿀 수 있다면 바꾸기
    private String method;
}
