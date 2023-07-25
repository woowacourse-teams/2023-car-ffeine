package com.carffeine.carffeine.station.fixture.charger;

import com.carffeine.carffeine.station.domain.charger.Charger;
import com.carffeine.carffeine.station.domain.charger.ChargerCondition;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.charger.ChargerType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@SuppressWarnings("NonAsciiCharacters")
public class ChargerFixture {

    public static final Charger 선릉역_충전기_1번_사용가능 = Charger.builder()
            .stationId("ME101010")
            .chargerId("01")
            .price(BigDecimal.valueOf(324.4))
            .method("단독")
            .capacity(BigDecimal.valueOf(50.0))
            .type(ChargerType.DC_COMBO)
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101010")
                    .chargerId("01")
                    .chargerCondition(ChargerCondition.STANDBY)
                    .latestUpdateTime(LocalDateTime.of(2021, 1, 1, 0, 0, 0))
                    .build())
            .build();

    public static final Charger 선릉역_충전기_2번_사용_중 = Charger.builder()
            .stationId("ME101010")
            .chargerId("02")
            .price(BigDecimal.valueOf(324.4))
            .method("단독")
            .capacity(BigDecimal.valueOf(50.0))
            .type(ChargerType.AC_3PHASE)
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101010")
                    .chargerId("02")
                    .chargerCondition(ChargerCondition.CHARGING_IN_PROGRESS)
                    .latestUpdateTime(LocalDateTime.of(2021, 1, 1, 0, 0, 0))
                    .build())
            .build();

    public static final Charger 잠실역_충전기_1번_사용_중 = Charger.builder()
            .stationId("ME101011")
            .chargerId("01")
            .price(BigDecimal.valueOf(324.4))
            .method("단독")
            .capacity(BigDecimal.valueOf(50.0))
            .type(ChargerType.DC_COMBO)
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101011")
                    .chargerId("01")
                    .chargerCondition(ChargerCondition.CHARGING_IN_PROGRESS)
                    .latestUpdateTime(LocalDateTime.now())
                    .build())
            .build();

    public static final Charger 선릉역_충전기_2번_변경됨 = Charger.builder()
            .stationId("ME101010")
            .chargerId("02")
            .price(BigDecimal.valueOf(324.4))
            .method("단독")
            .capacity(BigDecimal.valueOf(50.0))
            .type(ChargerType.DC_COMBO)
            .chargerStatus(ChargerStatus.builder()
                    .stationId("ME101010")
                    .chargerId("02")
                    .chargerCondition(ChargerCondition.CHARGING_IN_PROGRESS)
                    .latestUpdateTime(LocalDateTime.now())
                    .build())
            .build();
}
