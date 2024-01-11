package com.carffeine.carffeine.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.station.domain.Stations;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨;
import static com.carffeine.carffeine.fixture.station.StationFixture.천호역_충전소_충전기_2개_사용가능_0개;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StationsTest {

    @Test
    void 회사_이름을_기준으로_충전소를_필터링한다() {
        // given
        Stations stations = Stations.from(List.of(
                천호역_충전소_충전기_2개_사용가능_0개,
                선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨
        ));

        // when
        List<Station> result = stations.findFilteredStations(List.of("볼튼"), new ArrayList<>(), new ArrayList<>());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨.getStationId());
        });
    }

    @Test
    void 충전기_타입을_기준으로_충전소를_필터링한다() {
        // given
        Stations stations = Stations.from(List.of(
                천호역_충전소_충전기_2개_사용가능_0개,
                선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨
        ));

        // when
        List<Station> result = stations.findFilteredStations(new ArrayList<>(), List.of(ChargerType.AC_SLOW), new ArrayList<>());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(천호역_충전소_충전기_2개_사용가능_0개.getStationId());
        });
    }

    @Test
    void 충전기_속도를_기준으로_충전소를_필터링한다() {
        // given
        Stations stations = Stations.from(List.of(
                천호역_충전소_충전기_2개_사용가능_0개,
                선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨
        ));

        // when
        List<Station> result = stations.findFilteredStations(new ArrayList<>(), new ArrayList<>(), List.of(BigDecimal.valueOf(100.00)));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(천호역_충전소_충전기_2개_사용가능_0개.getStationId());
        });
    }
}
