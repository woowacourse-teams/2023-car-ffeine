package com.carffeine.carffeine.fixture;

import com.carffeine.carffeine.domain.Charger;
import com.carffeine.carffeine.domain.ChargerState;
import com.carffeine.carffeine.domain.ChargerStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@SuppressWarnings("NonAsciiCharacters")
public class ChargerFixture {

    public static final Charger 선릉역_충전기_1번_사용가능 = Charger.builder()
            .stationId("ME101010")
            .chargerId("01")
            .price("10000")
            .method("단독")
            .capacity(BigDecimal.valueOf(50.0))
            .type("급속")
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101010")
                    .chargerId("01")
                    .chargerState(ChargerState.STANDBY)
                    .latestUpdateTime(LocalDateTime.now())
                    .build())
            .build();

    public static final Charger 선릉역_충전기_2번_사용_중 = Charger.builder()
            .stationId("ME101010")
            .chargerId("02")
            .price("10000")
            .method("단독")
            .capacity(BigDecimal.valueOf(50.0))
            .type("급속")
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101010")
                    .chargerId("02")
                    .chargerState(ChargerState.CHARGING_IN_PROGRESS)
                    .latestUpdateTime(LocalDateTime.now())
                    .build())
            .build();
}
