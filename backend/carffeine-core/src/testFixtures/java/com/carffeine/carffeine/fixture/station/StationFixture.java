package com.carffeine.carffeine.fixture.station;

import com.carffeine.carffeine.fixture.station.charger.ChargerFixture;
import com.carffeine.carffeine.station.domain.Latitude;
import com.carffeine.carffeine.station.domain.Longitude;
import com.carffeine.carffeine.station.domain.Station;

import java.util.List;

@SuppressWarnings("NonAsciiCharacters")
public class StationFixture {

    public static final Station 선릉역_충전소_충전기_2개_사용가능_1개 = Station.builder()
            .stationId("ME101010")
            .stationName("선릉역 충전소")
            .companyName("볼튼")
            .address("선릉역 123-22")
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

    public static final Station 선릉역_충전소_충전기_2개_사용가능_1개_완속 = Station.builder()
            .stationId("ME101010")
            .stationName("선릉역 충전소")
            .companyName("볼튼")
            .address("서울특별시 선릉역 123-22")
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
                            ChargerFixture.선릉역_충전기_2번_변경됨
                    )
            )
            .build();

    public static final Station 선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨 = Station.builder()
            .stationId("ME101010")
            .stationName("선릉역2 충전소")
            .companyName("볼튼")
            .address("선릉역 123-22")
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

    public static final Station 선릉역_충전소_충전기_0개_사용가능_0개 = Station.builder()
            .stationId("ME101010")
            .stationName("선릉역 충전소")
            .companyName("볼튼")
            .address("선릉역 123-22")
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

    public static final Station 잠실역_충전소_충전기_2개_사용가능_1개 = Station.builder()
            .stationId("ME101011")
            .stationName("잠실역 충전소")
            .companyName("볼튼")
            .address("잠실역 123-22")
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
                            ChargerFixture.잠실역_충전기_1번_사용_중
                    )
            )
            .build();

    public static final Station 천호역_충전소_충전기_2개_사용가능_0개 = Station.builder()
            .stationId("MZ101011")
            .stationName("천호역 충전소")
            .companyName("환경부")
            .address("서울특별시 천호역 123-22")
            .isParkingFree(true)
            .operatingTime("24시간 이용가능")
            .detailLocation("1층")
            .latitude(Latitude.from("37.3994933"))
            .longitude(Longitude.from("128.3994933"))
            .isPrivate(false)
            .contact("02-0202-0882")
            .stationState("yyyy-mm-dd일부터 충전소 공사합니다.")
            .privateReason("이용 제한 사유 없습니다.")
            .chargers(
                    List.of(
                            ChargerFixture.천호역_고속충전기_1번_사용_중,
                            ChargerFixture.천호역_충전기_2번_사용_중
                    )
            )
            .build();

    public static final Station 빈_충전소_충전기_0개_사용가능_0개 = Station.builder()
            .stationId("MZ101013")
            .stationName("빈 충전소")
            .companyName("이브이시스")
            .address("삼성동 143-19")
            .isParkingFree(true)
            .operatingTime("24시간 이용가능")
            .detailLocation("1층")
            .latitude(Latitude.from("34.3994933"))
            .longitude(Longitude.from("123.3994933"))
            .isPrivate(false)
            .contact("010-2xxx-xxxx")
            .stationState("yyyy-mm-dd일부터 충전소 오픈합니다.")
            .privateReason("이용 제한 사유 없습니다.")
            .chargers(List.of())
            .build();
    public static final Station 부산역_충전소_충전기_1개_사용가능_1개 = Station.builder()
            .stationId("MZ101016")
            .stationName("부산역 충전소")
            .companyName("이브이시스")
            .address("부산광역시 부전동 143-19")
            .isParkingFree(true)
            .operatingTime("24시간 이용가능")
            .detailLocation("1층")
            .latitude(Latitude.from("36.3994933"))
            .longitude(Longitude.from("123.3994933"))
            .isPrivate(false)
            .contact("010-2xxx-xxxx")
            .stationState("yyyy-mm-dd일부터 충전소 오픈합니다.")
            .privateReason("이용 제한 사유 없습니다.")
            .chargers(List.of())
            .build();
    ;
}
