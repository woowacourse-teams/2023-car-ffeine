package com.carffeine.carffeine.station.integration.congestion;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionInfoResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.StatisticsResponse;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;

public class CongestionIntegrationTestFixture extends IntegrationTest {

    @Autowired
    private StationRepository stationRepository;

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

    protected void 혼잡도의_데이터가_정상적으로_조회된다(ExtractableResponse<Response> response) {
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
}
