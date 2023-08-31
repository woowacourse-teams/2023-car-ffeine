package com.carffeine.carffeine.station.service.station;

import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@SpringBootTest
public class StationQueryServiceTest {

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
}
