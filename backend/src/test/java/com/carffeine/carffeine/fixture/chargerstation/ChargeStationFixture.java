package com.carffeine.carffeine.fixture.chargerstation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.Latitude;
import com.carffeine.carffeine.domain.chargestation.Longitude;

import java.util.List;

import static com.carffeine.carffeine.fixture.chargerstation.ChargerFixture.선릉역_충전기_1번_사용가능;
import static com.carffeine.carffeine.fixture.chargerstation.ChargerFixture.선릉역_충전기_2번_변경됨;
import static com.carffeine.carffeine.fixture.chargerstation.ChargerFixture.선릉역_충전기_2번_사용_중;

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
                            선릉역_충전기_1번_사용가능,
                            선릉역_충전기_2번_사용_중
                    )
            )
            .build();

    public static final ChargeStation 선릉역_충전소_충전기_2개_사용가능_1개_완속 = ChargeStation.builder()
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
                            선릉역_충전기_1번_사용가능,
                            선릉역_충전기_2번_변경됨
                    )
            )
            .build();

    public static final ChargeStation 선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨 = ChargeStation.builder()
            .stationId("ME101010")
            .stationName("선릉역2 충전소")
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
                            선릉역_충전기_1번_사용가능,
                            선릉역_충전기_2번_사용_중
                    )
            )
            .build();

    public static final ChargeStation 선릉역_충전소_충전기_0개_사용가능_0개 = ChargeStation.builder()
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
                    )
            )
            .build();
}
