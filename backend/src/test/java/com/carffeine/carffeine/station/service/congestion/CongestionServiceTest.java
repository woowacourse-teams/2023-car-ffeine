package com.carffeine.carffeine.station.service.congestion;

import com.carffeine.carffeine.station.controller.congestion.dto.CongestionInfoResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.StatisticsResponse;
import com.carffeine.carffeine.station.domain.charger.ChargerRepository;
import com.carffeine.carffeine.station.domain.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.station.exception.congestion.CongestionException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.station.exception.congestion.CongestionExceptionType.INVALID_DAY_OF_WEEK;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class CongestionServiceTest {

    private CongestionService congestionService;

    @Autowired
    void setCongestionService(PeriodicCongestionRepository periodicCongestionRepository, ChargerRepository chargerRepository) {
        congestionService = new CongestionService(periodicCongestionRepository, chargerRepository);
    }

    @Test
    void 상태값이_없는_데이터일_경우_음수가_반환된다() {
        // given
        StatisticsResponse statisticsResponse = congestionService.showCongestionStatistics("ME174003", 1);
        CongestionResponse expected = new CongestionResponse(getCongestions(), getCongestions());

        // when & then
        assertThat(expected).usingRecursiveComparison()
                .isEqualTo(statisticsResponse.congestion());
    }

    @Test
    void 월요일부터_일요일이_아닌_요청에_대해서는_예외를_발생한다() {
        // given
        int notValidDay = 8;

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
