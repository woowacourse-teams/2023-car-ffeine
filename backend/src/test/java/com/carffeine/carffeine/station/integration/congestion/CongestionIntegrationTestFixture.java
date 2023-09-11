package com.carffeine.carffeine.station.integration.congestion;

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
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;

public class CongestionIntegrationTestFixture extends IntegrationTest {

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private PeriodicCongestionCustomRepository periodicCongestionCustomRepository;

    @BeforeEach
    void 충전소_설정() {
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
    }

    protected <T> ExtractableResponse 월요일의_혼잡도를_가져온다(String url) {
        return RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when()
                .get(url)
                .then().log().all()
                .extract();
    }

    protected void 혼잡도가_성공적으로_조회된다(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    protected void 혼잡도의_데이터가_음수로_조회된다(ExtractableResponse<Response> response) {
        StatisticsResponse actual = response.body().as(StatisticsResponse.class);
        StatisticsResponse expected = new StatisticsResponse("ME101010", new CongestionResponse(
                getCongestions(),
                getCongestions()
        ));

        assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
    }

    private List<CongestionInfoResponse> getCongestions() {
        List<CongestionInfoResponse> congestions = new ArrayList<>();

        for (int i = 0; i < 24; i++) {
            congestions.add(new CongestionInfoResponse(i, -1));
        }

        return congestions;
    }

    protected void 충전소_혼잡도_생성() {
        Station savedStation = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        List<PeriodicCongestion> congestions = createCongestions(List.of(savedStation.getChargers().get(1).getChargerStatus()), DayOfWeek.MONDAY, RequestPeriod.ZERO);

        periodicCongestionCustomRepository.saveAllIfNotExist(congestions);
        periodicCongestionCustomRepository.updateUsingCount(DayOfWeek.MONDAY, RequestPeriod.ZERO, List.of(savedStation.getChargers().get(1).getChargerStatus()));
        periodicCongestionCustomRepository.updateTotalCountByPeriod(DayOfWeek.MONDAY, RequestPeriod.ZERO);
    }

    private List<PeriodicCongestion> createCongestions(List<ChargerStatus> chargerStatuses, DayOfWeek day, RequestPeriod period) {
        return chargerStatuses.stream()
                .map(it -> PeriodicCongestion.createDefault(day, period, it.getStationId(), it.getChargerId()))
                .toList();
    }

    protected void 혼잡도의_데이터가_정상적으로_조회된다(ExtractableResponse<Response> response) {
        StatisticsResponse actual = response.body().as(StatisticsResponse.class);
        StatisticsResponse expected = new StatisticsResponse("ME101010", new CongestionResponse(
                getCongestions(),
                getCongestionsWithValue()
        ));

        assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
    }

    private List<CongestionInfoResponse> getCongestionsWithValue() {
        List<CongestionInfoResponse> congestions = new ArrayList<>();

        congestions.add(new CongestionInfoResponse(0, 0.0));
        for (int i = 1; i < 24; i++) {
            congestions.add(new CongestionInfoResponse(i, -1));
        }

        return congestions;
    }
}
