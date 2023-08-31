package com.carffeine.carffeine.station.infrastructure.repository.station;

import com.carffeine.carffeine.config.QuerydslConfig;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
@Import(value = {QuerydslConfig.class, StationQueryRepository.class})
public class StationQueryRepositoryTest {

    @Autowired
    private StationQueryRepository stationQueryRepository;

    @Autowired
    private StationRepository stationRepository;

    @Test
    void 충전소의_정보를_상세_조회한다() {
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        Optional<StationSpecificResponse> result = stationQueryRepository.findStationById(station.getStationId());

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
}
