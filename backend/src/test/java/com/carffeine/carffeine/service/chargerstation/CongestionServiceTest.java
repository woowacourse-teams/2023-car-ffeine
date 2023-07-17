package com.carffeine.carffeine.service.chargerstation;

import com.carffeine.carffeine.controller.chargerStation.dto.CongestionInfoResponse;
import com.carffeine.carffeine.controller.chargerStation.dto.CongestionResponse;
import com.carffeine.carffeine.controller.chargerStation.dto.StatisticsResponse;
import com.carffeine.carffeine.domain.chargestation.charger.ChargerRepository;
import com.carffeine.carffeine.domain.chargestation.congestion.PeriodicCongestionRepository;
import com.carffeine.carffeine.service.chargerstation.dto.StatisticsRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    void 혼잡도_계산() {
        StatisticsRequest statisticsRequest = new StatisticsRequest("ME174003");
        StatisticsResponse statisticsResponse = congestionService.calculateCongestion(statisticsRequest);

        CongestionResponse expected = getExpected();

        Assertions.assertThat(expected).usingRecursiveComparison()
                .isEqualTo(statisticsResponse.congestion());
    }

    private CongestionResponse getExpected() {
        List<CongestionInfoResponse> dailyCongestion = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            dailyCongestion.add(new CongestionInfoResponse(i, -1));
        }
        return new CongestionResponse(
                Map.of("MON", dailyCongestion,
                        "TUE", dailyCongestion,
                        "WED", dailyCongestion,
                        "THU", dailyCongestion,
                        "FRI", dailyCongestion,
                        "SAT", dailyCongestion,
                        "SUN", dailyCongestion),
                Map.of("MON", dailyCongestion,
                        "TUE", dailyCongestion,
                        "WED", dailyCongestion,
                        "THU", dailyCongestion,
                        "FRI", dailyCongestion,
                        "SAT", dailyCongestion,
                        "SUN", dailyCongestion)
        );
    }
}
