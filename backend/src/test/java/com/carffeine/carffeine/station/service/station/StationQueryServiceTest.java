package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.fixture.charger.ChargerFixture;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import com.carffeine.carffeine.station.service.station.dto.StationSearchResponse;
import com.carffeine.carffeine.station.service.station.dto.StationsSearchResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    @Test
    void 총_15개의_충전소_중_관련_검색어에_맞는_충전소가_검색된다() {
        // given
        List<StationSearchResponse> stations = new ArrayList<>();
        for (int i = 0; i < 15; i++) {
            String stationId = "stationId" + String.format("%02d", i);
            String stationName = "stationName" + String.format("%02d", i);
            Station station = Station.builder()
                    .stationId(stationId)
                    .stationName(stationName)
                    .companyName("환경부")
                    .address("천호역 123-22")
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

            stations.add(new StationSearchResponse(
                    station.getStationId(),
                    station.getStationName(),
                    station.getAddress(),
                    station.getLatitude().getValue(),
                    station.getLongitude().getValue()
            ));
            stationRepository.save(station);
        }

        List<StationSearchResponse> expected = stations.stream().
                filter(it -> it.stationName().contains("stationName1"))
                .limit(5).toList();

        // when
        StationsSearchResponse result = stationQueryService.searchStations("stationName1", Set.of("stationId", "stationName", "address", "latitude", "longitude"), 1, 12);

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(new StationsSearchResponse(5L, expected));
    }

    @Test
    void 총_15개의_충전소_중_관련_검색어에_맞는_충전소가_최대_12개_검색된다() {
        // given
        List<StationSearchResponse> stations = new ArrayList<>();
        for (int i = 0; i < 15; i++) {
            String stationId = "stationId" + String.format("%02d", i);
            Station station = Station.builder()
                    .stationId(stationId)
                    .stationName("천호역 충전소")
                    .companyName("환경부")
                    .address("천호역 123-22")
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

            stations.add(new StationSearchResponse(
                    station.getStationId(),
                    station.getStationName(),
                    station.getAddress(),
                    station.getLatitude().getValue(),
                    station.getLongitude().getValue()
            ));
            stationRepository.save(station);
        }

        List<StationSearchResponse> expected = stations.stream()
                .filter(it -> it.stationName().contains("충전소"))
                .limit(12).toList();

        // when
        StationsSearchResponse result = stationQueryService.searchStations("충전소", Set.of("stationId", "stationName", "address", "latitude", "longitude"), 1, 12);

        // then
        assertThat(result).usingRecursiveComparison()
                .isEqualTo(new StationsSearchResponse(15L, expected));
    }
}
