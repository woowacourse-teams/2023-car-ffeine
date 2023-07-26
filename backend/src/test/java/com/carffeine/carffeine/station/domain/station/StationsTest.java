package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.빈_충전소_충전기_0개_사용가능_0개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.천호역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StationsTest {

    @Test
    void 회사_이름을_기준으로_충전소를_필터링한다() {
        // given
        Stations stations = Stations.of(List.of(
                천호역_충전소_충전기_2개_사용가능_1개,
                선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨
        ));

        // when
        stations.filterByCompanyNames(List.of("볼튼"));

        // then
        assertAll(
                () -> assertThat(stations.getStationsExclusiveEmptyChargers().size()).isEqualTo(1),
                () -> assertThat(stations.getStationsExclusiveEmptyChargers().get(0).getStationId()).isEqualTo(선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨.getStationId())
        );
    }

    @Test
    void 충전기_타입을_기준으로_충전소를_필터링한다() {
        // given
        Stations stations = Stations.of(List.of(
                천호역_충전소_충전기_2개_사용가능_1개,
                선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨
        ));

        // when
        stations.filterByChargerTypes(List.of(ChargerType.AC_SLOW));

        // then
        assertAll(
                () -> assertThat(stations.getStationsExclusiveEmptyChargers().size()).isEqualTo(1),
                () -> assertThat(stations.getStationsExclusiveEmptyChargers().get(0).getStationId()).isEqualTo(천호역_충전소_충전기_2개_사용가능_1개.getStationId())
        );
    }

    @Test
    void 충전기_속도를_기준으로_충전소를_필터링한다() {
        // given
        Stations stations = Stations.of(List.of(
                천호역_충전소_충전기_2개_사용가능_1개,
                선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨
        ));

        // when
        stations.filterByCapacities(List.of(BigDecimal.valueOf(100.00)));

        // then
        assertAll(
                () -> assertThat(stations.getStationsExclusiveEmptyChargers().size()).isEqualTo(1),
                () -> assertThat(stations.getStationsExclusiveEmptyChargers().get(0).getStationId()).isEqualTo(천호역_충전소_충전기_2개_사용가능_1개.getStationId())
        );
    }

    @Test
    void 빈_충전기만_있는_충전소를_제외한_모든_충전소를_반환한다() {
        // given
        Stations stations = Stations.of(List.of(
                천호역_충전소_충전기_2개_사용가능_1개,
                선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨,
                빈_충전소_충전기_0개_사용가능_0개
        ));

        // when
        List<Station> result = stations.getStationsExclusiveEmptyChargers();

        // then
        assertThat(result.size()).isEqualTo(2);
    }
}
