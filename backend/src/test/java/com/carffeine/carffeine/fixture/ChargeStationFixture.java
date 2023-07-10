package com.carffeine.carffeine.fixture;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.domain.Latitude;
import com.carffeine.carffeine.domain.Longitude;

import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class ChargeStationFixture {

    public static final ChargeStation 선릉역_충전소_충전기_2개_사용가능_1개 = ChargeStation.builder()
            .stationId("ME101010")
            .stationName("선릉역 충전소")
            .companyName("볼튼")
            .isParkingFree(true)
            .operatingTime("24시간 이용가능")
            .detailLocation("2층")
            .latitude(Latitude.from("38.3994933"))
            .longitude(Longitude.from("128.3994933"))
            .isPrivate(false)
            .contact("02-0202-0202")
            .stationState("yyyy-mm-dd일부터 충전소 공사합니다.")
            .privateReason("이용 제한 사유 없습니다.")
            .chargers(
                    List.of(
                            ChargerFixture.선릉역_충전기_1번_사용가능,
                            ChargerFixture.선릉역_충전기_2번_사용_중
                    )
            )
            .build();

}
