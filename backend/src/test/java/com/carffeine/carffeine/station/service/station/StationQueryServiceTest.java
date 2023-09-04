package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class StationQueryServiceTest extends IntegrationTest {

    @Autowired
    private StationQueryService stationQueryService;

    @Autowired
    private StationRepository stationRepository;

    @Test
    void 충전소의_정보를_상세_조회한다() {
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        StationSpecificResponse result = stationQueryService.findStationById(station.getStationId());

        assertSoftly(softly -> {
            softly.assertThat(result).usingRecursiveComparison()
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
                                    )).toList()));
        });
    }

    @Test
    void 충전소의_정보가_없다면_예외가_발생한다() {
        assertThatThrownBy(() -> stationQueryService.findStationById("WRONG_ID"))
                .isInstanceOf(StationException.class)
                .hasMessage(StationExceptionType.NOT_FOUND_ID.message());
    }

    @Test
    void 위도_경도로_충전소를_조회한다() {
        //given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);
        Station station1 = StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station1);

        BigDecimal centerX = BigDecimal.valueOf(37.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<StationSimpleResponse> result = stationQueryService.findByLocation(coordinateRequest, List.of(), List.of(), List.of());

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(
                                new StationSimpleResponse(
                                        station.getStationId(),
                                        station.getStationName(),
                                        station.getLatitude().getValue(),
                                        station.getLongitude().getValue(),
                                        station.isParkingFree(),
                                        station.isPrivate(),
                                        station.getAvailableCount(),
                                        station.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                                ),
                                new StationSimpleResponse(
                                        station1.getStationId(),
                                        station1.getStationName(),
                                        station1.getLatitude().getValue(),
                                        station1.getLongitude().getValue(),
                                        station1.isParkingFree(),
                                        station1.isPrivate(),
                                        station1.getAvailableCount(),
                                        station1.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                                )
                        )
                );
    }

    @Test
    void 위도_경도로_조회할_때_충전소_회사로_필터링한다() {
        //given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);
        Station station1 = StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station1);

        BigDecimal centerX = BigDecimal.valueOf(37.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<StationSimpleResponse> result = stationQueryService.findByLocation(coordinateRequest, List.of("볼튼"), List.of(), List.of());

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(
                                new StationSimpleResponse(
                                        station.getStationId(),
                                        station.getStationName(),
                                        station.getLatitude().getValue(),
                                        station.getLongitude().getValue(),
                                        station.isParkingFree(),
                                        station.isPrivate(),
                                        station.getAvailableCount(),
                                        station.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                                ),
                                new StationSimpleResponse(
                                        station1.getStationId(),
                                        station1.getStationName(),
                                        station1.getLatitude().getValue(),
                                        station1.getLongitude().getValue(),
                                        station1.isParkingFree(),
                                        station1.isPrivate(),
                                        station1.getAvailableCount(),
                                        station1.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                                )
                        )
                );
    }

    @Test
    void 위도_경도로_조회할_때_충전기_타입으로_필터링한다() {
        //given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);
        Station station1 = StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station1);

        BigDecimal centerX = BigDecimal.valueOf(37.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<StationSimpleResponse> result = stationQueryService.findByLocation(coordinateRequest, List.of(), List.of(ChargerType.AC_3PHASE), List.of());

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(
                                new StationSimpleResponse(
                                        station.getStationId(),
                                        station.getStationName(),
                                        station.getLatitude().getValue(),
                                        station.getLongitude().getValue(),
                                        station.isParkingFree(),
                                        station.isPrivate(),
                                        station.getAvailableCount(),
                                        station.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                                )
                        )
                );
    }

    @Test
    void 위도_경도로_조회할_때_충전속도로_필터링한다() {
        //given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);
        Station station1 = StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station1);

        BigDecimal centerX = BigDecimal.valueOf(37.3994933);
        BigDecimal centerY = BigDecimal.valueOf(127.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);

        // when
        List<StationSimpleResponse> result = stationQueryService.findByLocation(coordinateRequest, List.of(), List.of(), List.of(BigDecimal.valueOf(50.0)));

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(
                                new StationSimpleResponse(
                                        station.getStationId(),
                                        station.getStationName(),
                                        station.getLatitude().getValue(),
                                        station.getLongitude().getValue(),
                                        station.isParkingFree(),
                                        station.isPrivate(),
                                        station.getAvailableCount(),
                                        station.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                                ),
                                new StationSimpleResponse(
                                        station1.getStationId(),
                                        station1.getStationName(),
                                        station1.getLatitude().getValue(),
                                        station1.getLongitude().getValue(),
                                        station1.isParkingFree(),
                                        station1.isPrivate(),
                                        station1.getAvailableCount(),
                                        station1.getChargers().stream().filter(it -> it.getCapacity().compareTo(BigDecimal.valueOf(50.0)) >= 0).count()
                                )
                        )
                );
    }

    @Test
    void 충전소의_id로_요약정보를_조회한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);
        Station station2 = StationFixture.천호역_충전소_충전기_2개_사용가능_0개;
        stationRepository.save(station2);

        // when
        List<StationSummaryResponse> result = stationQueryService.findStationsSummary(List.of(station.getStationId(), station2.getStationId()));

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(List.of(
                                new StationSummaryResponse(
                                        station.getStationId(),
                                        station.getCompanyName(),
                                        station.getStationName(),
                                        station.getAddress(),
                                        station.getOperatingTime(),
                                        station.isParkingFree(),
                                        station.isPrivate(),
                                        station.getLatitude().getValue(),
                                        station.getLongitude().getValue(),
                                        station.getChargers().stream().filter(charger -> charger.getCapacity().compareTo(BigDecimal.valueOf(50)) >= 0).count()
                                ),
                                new StationSummaryResponse(
                                        station2.getStationId(),
                                        station2.getCompanyName(),
                                        station2.getStationName(),
                                        station2.getAddress(),
                                        station2.getOperatingTime(),
                                        station2.isParkingFree(),
                                        station2.isPrivate(),
                                        station2.getLatitude().getValue(),
                                        station2.getLongitude().getValue(),
                                        station2.getChargers().stream().filter(charger -> charger.getCapacity().compareTo(BigDecimal.valueOf(50)) >= 0).count()
                                )
                        )
                );
    }
}
