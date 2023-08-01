package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.FakeStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.천호역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StationServiceTest {

    private StationRepository stationRepository;
    private StationService stationService;

    @BeforeEach
    void before() {
        stationRepository = new FakeStationRepository();
        stationService = new StationService(stationRepository, null, null, null);
    }

    @Test
    void 위도_경도로_충전소를_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);
        BigDecimal centerX = BigDecimal.valueOf(37.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<Station> stations = stationService.findByCoordinate(coordinateRequest, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        // then
        assertThat(stations).hasSize(1);
    }

    @Test
    void 위도_경도_범위에_없는_충전소를_조회하면_조회되지_않는다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);
        BigDecimal centerX = BigDecimal.valueOf(36.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<Station> stations = stationService.findByCoordinate(coordinateRequest, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        // then
        assertThat(stations).isEmpty();
    }

    @Test
    void 회사_이름을_기준으로_필터링_및_조회를_한다() {
        // given
        Station station = stationRepository.save(잠실역_충전소_충전기_2개_사용가능_1개);
        stationRepository.save(천호역_충전소_충전기_2개_사용가능_1개);
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
        stationRepository.save(천호역_충전소_충전기_2개_사용가능_1개);
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
        stationRepository.save(천호역_충전소_충전기_2개_사용가능_1개);
        CoordinateRequest coordinateRequest = new CoordinateRequest(new BigDecimal("38.3994933"), new BigDecimal("128.3994933"), new BigDecimal("0.005"), new BigDecimal("0.005"));

        // when
        List<Station> result = stationService.findByCoordinate(coordinateRequest, new ArrayList<>(), new ArrayList<>(), List.of(new BigDecimal("50.00")));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(station.getStationId());
        });
    }

    @Test
    void 충전소_id_값으로_충전소를_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        // when
        Station stationById = stationService.findStationById(station.getStationId());

        // then
        assertThat(stationById).usingRecursiveComparison()
                .isEqualTo(station);
    }

    @Test
    void 충전소_id가_존재하지_않다면_조회되지_않는다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        String invalidChargeStationId = "INVALID_ID_001";
        stationRepository.save(station);

        // when & then
        assertThatThrownBy(() -> stationService.findStationById(invalidChargeStationId))
                .isInstanceOf(StationException.class)
                .hasMessage(StationExceptionType.NOT_FOUND_ID.message());
    }
}
