package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.DayOfWeek;
import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PeriodicCongestionCustomRepositoryImplTest extends IntegrationTest {

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private PeriodicCongestionCustomRepositoryImpl periodicCongestionCustomRepository;

    @Autowired
    private PeriodicCongestionRepository periodicCongestionRepository;

    @Test
    void DB에_혼잡도_정보가_없다면_저장한다() {
        // given
        Station savedStation = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        periodicCongestionCustomRepository.saveAllIfNotExist(List.of(
                PeriodicCongestion.createDefault(DayOfWeek.MONDAY, RequestPeriod.ONE, savedStation.getStationId(), "01")
        ));

        List<PeriodicCongestion> periodicCongestions = List.of(
                PeriodicCongestion.createDefault(DayOfWeek.MONDAY, RequestPeriod.ONE, savedStation.getStationId(), "01"),
                PeriodicCongestion.createDefault(DayOfWeek.MONDAY, RequestPeriod.ONE, savedStation.getStationId(), "02")
        );

        // when
        periodicCongestionCustomRepository.saveAllIfNotExist(periodicCongestions);

        // then
        List<PeriodicCongestion> result = periodicCongestionRepository.findAllByStationIdAndDayOfWeek(savedStation.getStationId(), DayOfWeek.MONDAY);
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(2);
            softly.assertThat(result.get(0).getStationId()).isEqualTo(savedStation.getStationId());
            softly.assertThat(result.get(1).getStationId()).isEqualTo(savedStation.getStationId());
        });
    }

    @Test
    void 요일과_시간을_기준으로_total_count를_업데이트한다() {
        // given
        Station savedStation = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);

        PeriodicCongestion congestion = PeriodicCongestion.createDefault(DayOfWeek.MONDAY, RequestPeriod.ONE, savedStation.getStationId(), "01");
        periodicCongestionCustomRepository.saveAllIfNotExist(List.of(
                congestion
        ));

        // when
        periodicCongestionCustomRepository.updateNotUsingCountByIds(List.of(congestion.getId()));

        // then
        PeriodicCongestion result = periodicCongestionRepository.findAllByStationIdAndDayOfWeek(savedStation.getStationId(), DayOfWeek.MONDAY).get(0);
        assertSoftly(softly -> {
            softly.assertThat(result.getTotalCount()).isEqualTo(1);
            softly.assertThat(result.getCongestion()).isEqualTo(0.0);
        });
    }

    @Test
    void 요일과_시간을_기준으로_사용중인_충전기에_대해서_count를_업데이트한다() {
        // given
        Station savedStation = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);

        PeriodicCongestion congestion = PeriodicCongestion.createDefault(DayOfWeek.MONDAY, RequestPeriod.ONE, savedStation.getStationId(), "02");
        PeriodicCongestion congestion1 = PeriodicCongestion.createDefault(DayOfWeek.MONDAY, RequestPeriod.ONE, savedStation.getStationId(), "01");
        periodicCongestionCustomRepository.saveAllIfNotExist(List.of(
                congestion1,
                congestion
        ));

        // when
        periodicCongestionCustomRepository.updateUsingCountByIds(List.of(congestion.getId()));

        // then
        PeriodicCongestion result = periodicCongestionRepository.findAllByStationIdAndDayOfWeek(savedStation.getStationId(), DayOfWeek.MONDAY).get(1);
        assertSoftly(softly -> {
            softly.assertThat(result.getTotalCount()).isEqualTo(1);
            softly.assertThat(result.getUseCount()).isEqualTo(1);
        });
    }

}
