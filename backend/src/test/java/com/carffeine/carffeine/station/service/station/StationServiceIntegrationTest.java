package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.천호역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StationServiceIntegrationTest extends IntegrationTest {

    @Autowired
    private StationService stationService;

    @Autowired
    private StationRepository stationRepository;

    @Test
    void 좌표값으로_충전소를_찾는다() {
        // given
        Station station = stationRepository.save(잠실역_충전소_충전기_2개_사용가능_1개);
        CoordinateRequest coordinateRequest = new CoordinateRequest(new BigDecimal("38.3994933"), new BigDecimal("128.3994933"), new BigDecimal("0.005"), new BigDecimal("0.005"));

        // when
        List<Station> result = stationService.findByCoordinate(coordinateRequest, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(station.getStationId());
        });
    }

    @Test
    void 회사_이름을_기준으로_필터링_및_조회를_한다() {
        // given
        Station station = stationRepository.save(잠실역_충전소_충전기_2개_사용가능_1개);
        Station stationOther = stationRepository.save(천호역_충전소_충전기_2개_사용가능_1개);
        CoordinateRequest coordinateRequest = new CoordinateRequest(new BigDecimal("38.3994933"), new BigDecimal("128.3994933"), new BigDecimal("0.005"), new BigDecimal("0.005"));

        // when
        List<Station> result = stationService.findByCoordinate(coordinateRequest, List.of("볼튼"), new ArrayList<>(), new ArrayList<>());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(station.getStationId());
        });
    }

    @Test
    void 충전기_타입을_기준으로_필터링_및_조회를_한다() {
        // given
        Station station = stationRepository.save(천호역_충전소_충전기_2개_사용가능_1개);
        Station stationOther = stationRepository.save(잠실역_충전소_충전기_2개_사용가능_1개);
        CoordinateRequest coordinateRequest = new CoordinateRequest(new BigDecimal("38.3994933"), new BigDecimal("128.3994933"), new BigDecimal("0.005"), new BigDecimal("0.005"));

        // when
        List<Station> result = stationService.findByCoordinate(coordinateRequest, new ArrayList<>(), List.of(ChargerType.DC_COMBO), new ArrayList<>());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(stationOther.getStationId());
        });
    }

    @Test
    void 충전_속도를_기준으로_필터링_및_조회를_한다() {
        // given
        Station station = stationRepository.save(잠실역_충전소_충전기_2개_사용가능_1개);
        Station stationOther = stationRepository.save(천호역_충전소_충전기_2개_사용가능_1개);
        CoordinateRequest coordinateRequest = new CoordinateRequest(new BigDecimal("38.3994933"), new BigDecimal("128.3994933"), new BigDecimal("0.005"), new BigDecimal("0.005"));

        // when
        List<Station> result = stationService.findByCoordinate(coordinateRequest, new ArrayList<>(), new ArrayList<>(), List.of(new BigDecimal("50.00")));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(station.getStationId());
        });
    }
}
