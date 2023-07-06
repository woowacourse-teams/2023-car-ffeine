package com.carffeine.carffeine.fixture;

import com.carffeine.carffeine.domain.ChargeStation;

import java.math.BigDecimal;
import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class ChargeStationFixture {

    public static final ChargeStation 선릉역_충전소_충전기_2개_사용가능_1개 = ChargeStation.builder()
            .stationId("ME101010")
            .companyName("볼튼")
            .contact("02-0202-0202")
            .isPrivate(false)
            .stationName("선릉역 충전소")
            .latitude(BigDecimal.valueOf(38.3994933))
            .longitude(BigDecimal.valueOf(38.3994933))
            .operatingTime("24시간 이용가능")
            .isParkingFree(true)
            .detailLocation("2층")
            .chargers(
                    List.of(
                            ChargerFixture.선릉역_충전기_1번_사용가능,
                            ChargerFixture.선릉역_충전기_2번_사용_중
                    )
            )
            .build();

}
