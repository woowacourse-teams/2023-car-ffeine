package com.carffeine.carffeine.station.infrastructure.repository.station;

import com.carffeine.carffeine.config.QuerydslConfig;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@Import(value = {QuerydslConfig.class, StationQueryRepository.class})
@DataJpaTest
class StationQueryRepositoryTest {

    @Autowired
    private StationQueryRepository stationQueryRepository;

    @Autowired
    private StationRepository stationRepository;

    @Test
    void 충전소의_정보를_상세_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        // when
        Optional<StationSpecificResponse> result = stationQueryRepository.findStationById(station.getStationId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).isPresent();
            softly.assertThat(result.get()).usingRecursiveComparison()
                    .withComparatorForType(BigDecimal::compareTo, BigDecimal.class)
                    .isEqualTo(new StationSpecificResponse(
                            station.getStationId(),
                            station.getStationName(),
                            station.getCompanyName(),
                            station.getAddress(),
                            station.getContact(),
                            station.isParkingFree(),
                            station.getOperatingTime(),
                            station.getDetailLocation(),
                            station.getLatitude().getValue(),
                            station.getLongitude().getValue(),
                            station.isPrivate(),
                            station.getStationState(),
                            station.getPrivateReason(),
                            station.getReportCount(),
                            station.getChargers().stream()
                                    .map(it -> new ChargerSpecificResponse(
                                            it.getType(),
                                            it.getPrice(),
                                            it.getCapacity(),
                                            it.getChargerStatus().getLatestUpdateTime(),
                                            it.getChargerStatus().getChargerCondition(),
                                            it.getMethod()
                                    )).toList()
                    ));
        });
    }

    @Test
    void 위도_경도로_충전소_id를_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        stationRepository.save(station);

        // when
        List<String> result = stationQueryRepository.findStationIdsByCoordinate(new BigDecimal("38.123444"), new BigDecimal("38.41234532"), new BigDecimal("128.38840213"), new BigDecimal("128.7123332"), List.of(), List.of(), List.of());

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(station.getStationId()));
    }

    @Test
    void 충전기_회사가_없으면_값을_반환하지_않는다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        stationRepository.save(station);

        // when
        List<String> result = stationQueryRepository.findStationIdsByCoordinate(new BigDecimal("38.123444"), new BigDecimal("38.41234532"), new BigDecimal("128.38840213"), new BigDecimal("128.7123332"), List.of("없는 회사"), List.of(), List.of());

        // then
        assertThat(result).isEmpty();
    }

    @Test
    void 충전기_타입으로_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        Station station2 = StationFixture.천호역_충전소_충전기_2개_사용가능_0개;
        stationRepository.save(station);
        stationRepository.save(station2);

        // when
        List<String> ids = stationQueryRepository.findStationIdsByCoordinate(new BigDecimal("37.123444"), new BigDecimal("38.41234532"), new BigDecimal("128.38840213"), new BigDecimal("128.7123332"), List.of(), List.of(ChargerType.AC_SLOW), List.of());

        // then
        assertThat(ids).usingRecursiveComparison()
                .isEqualTo(List.of(station2.getStationId()));
    }

    @Test
    void 충전기_회사로_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        Station station2 = StationFixture.천호역_충전소_충전기_2개_사용가능_0개;
        stationRepository.save(station);
        stationRepository.save(station2);

        // when
        List<String> ids = stationQueryRepository.findStationIdsByCoordinate(new BigDecimal("37.123444"), new BigDecimal("38.41234532"), new BigDecimal("128.38840213"), new BigDecimal("128.7123332"), List.of("볼튼"), List.of(), List.of());

        // then
        assertThat(ids).usingRecursiveComparison()
                .isEqualTo(List.of(station.getStationId()));
    }

    @Test
    void 충전기_속도로_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        Station station2 = StationFixture.천호역_충전소_충전기_2개_사용가능_0개;
        stationRepository.save(station);
        stationRepository.save(station2);

        // when
        List<String> ids = stationQueryRepository.findStationIdsByCoordinate(new BigDecimal("37.123444"), new BigDecimal("38.41234532"), new BigDecimal("128.38840213"), new BigDecimal("128.7123332"), List.of(), List.of(), List.of(new BigDecimal("50.0")));

        // then
        assertThat(ids).usingRecursiveComparison()
                .isEqualTo(List.of(station.getStationId()));
    }

    @Test
    void 충전기_id로_간단_정보를_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        stationRepository.save(station);

        // when
        List<StationSimpleResponse> result = stationQueryRepository.findStationByStationIds(List.of(station.getStationId()));

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(new StationSimpleResponse(
                        station.getStationId(),
                        station.getStationName(),
                        station.getLatitude().getValue(),
                        station.getLongitude().getValue(),
                        station.isParkingFree(),
                        station.isPrivate(),
                        station.getAvailableCount(),
                        station.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                )));
    }

    @Test
    void 충전기_id로_충전소의_요약된_정보를_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        stationRepository.save(station);

        // when
        List<StationSummaryResponse> result = stationQueryRepository.findStationsSummary(List.of(station.getStationId()));

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(new StationSummaryResponse(
                        station.getStationId(),
                        station.getCompanyName(),
                        station.getStationName(),
                        station.getAddress(),
                        station.getOperatingTime(),
                        station.isParkingFree(),
                        station.isPrivate(),
                        station.getLatitude().getValue(),
                        station.getLongitude().getValue(),
                        station.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                )));
    }
}
