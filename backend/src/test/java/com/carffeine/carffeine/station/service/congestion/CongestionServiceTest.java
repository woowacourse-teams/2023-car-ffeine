package com.carffeine.carffeine.station.service.congestion;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionInfoResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.StatisticsResponse;
import com.carffeine.carffeine.station.domain.charger.ChargerStatus;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestion;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionCustomRepository;
import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.congestion.CongestionException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.station.exception.congestion.CongestionExceptionType.INVALID_DAY_OF_WEEK;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CongestionServiceTest extends IntegrationTest {

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private PeriodicCongestionCustomRepository periodicCongestionCustomRepository;

    @Autowired
    private CongestionService congestionService;

    @Test
    void 상태값이_있는_데이터일_경우_계산_값이_반환된다() {
        // given
        CongestionInfoResponse expected = new CongestionInfoResponse(1, 1.0);

        Station savedStation = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        List<PeriodicCongestion> congestions = createCongestions(List.of(savedStation.getChargers().get(1).getChargerStatus()), DayOfWeek.MONDAY, RequestPeriod.ONE);

        periodicCongestionCustomRepository.saveAllIfNotExist(congestions);
        periodicCongestionCustomRepository.updateUsingCountByIds(List.of(congestions.get(0).getId()));
        periodicCongestionCustomRepository.updateNotUsingCountByIds(List.of(congestions.get(0).getId()));

        // when
        StatisticsResponse monday = congestionService.showCongestionStatistics(savedStation.getStationId(), "monday");

        // then
        assertSoftly(softly -> {
            softly.assertThat(monday.congestion().standard()).usingRecursiveComparison().isEqualTo(getCongestions());
            softly.assertThat(monday.congestion().quick().get(1)).usingRecursiveComparison().isEqualTo(expected);
            softly.assertThat(monday.congestion().quick().get(0)).isEqualTo(new CongestionInfoResponse(0, -1.0));
        });
    }

    private List<PeriodicCongestion> createCongestions(List<ChargerStatus> chargerStatuses, DayOfWeek day, RequestPeriod period) {
        return chargerStatuses.stream()
                .map(it -> PeriodicCongestion.createDefault(day, period, it.getStationId(), it.getChargerId()))
                .toList();
    }

    @Test
    void 상태값이_없는_데이터일_경우_음수가_반환된다() {
        // given
        StatisticsResponse statisticsResponse = congestionService.showCongestionStatistics("ME174003", "monday");
        CongestionResponse expected = new CongestionResponse(getCongestions(), getCongestions());

        // when & then
        assertThat(expected).usingRecursiveComparison()
                .isEqualTo(statisticsResponse.congestion());
    }

    @Test
    void 월요일부터_일요일이_아닌_요청에_대해서는_예외를_발생한다() {
        // given
        String notValidDay = "invalidMonday";

        // when & then
        assertThatThrownBy(() -> congestionService.showCongestionStatistics("ME174003", notValidDay))
                .isInstanceOf(CongestionException.class)
                .hasMessage(INVALID_DAY_OF_WEEK.message());
    }

    private List<CongestionInfoResponse> getCongestions() {
        List<CongestionInfoResponse> congestions = new ArrayList<>();

        for (int i = 0; i < 24; i++) {
            congestions.add(new CongestionInfoResponse(i, -1));
        }

        return congestions;
    }
}
