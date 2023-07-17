package com.carffeine.carffeine.integration.chargestation;

import com.carffeine.carffeine.controller.chargerStation.dto.ChargeStationSpecificResponse;
import com.carffeine.carffeine.controller.chargerStation.dto.ChargeStationsSimpleResponse;
import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.integration.AcceptanceTestFixture;
import com.carffeine.carffeine.service.chargerstation.dto.CoordinateRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SuppressWarnings("NonAsciiCharacters")
public abstract class ChargerStationIntegrationTestFixture extends AcceptanceTestFixture {

    public static ExtractableResponse<Response> 좌표로_정보를_조회한다(CoordinateRequest request) {
        return RestAssured.given().log().all()
                .param("latitude", request.latitude())
                .param("longitude", request.longitude())
                .param("latitudeDelta", request.latitudeDelta())
                .param("longitudeDelta", request.longitudeDelta())
                .get("/api/stations")
                .then().log().all()
                .extract();
    }

    public static void 충전소_간단_정보를_검증한다(ExtractableResponse<Response> extract, ChargeStation... 충전소들) {
        var response = extract.as(ChargeStationsSimpleResponse.class);
        assertThat(response).usingRecursiveComparison()
                .withEqualsForType((i, i2) -> i.compareTo(i2) == 0, BigDecimal.class)
                .isEqualTo(ChargeStationsSimpleResponse.from(List.of(충전소들)));
    }

    public static CoordinateRequest 좌표_중심값과_화면_크기(String 중심_경도, String 중심_위도, String 화면_경도, String 화면_위도) {
        return new CoordinateRequest(new BigDecimal(중심_경도), new BigDecimal(중심_위도), new BigDecimal(화면_경도), new BigDecimal(화면_위도));
    }

    public static ExtractableResponse<Response> 충전소_ID로_상세_정보를_조회한다(String 충전소_ID) {
        return RestAssured.given().log().all()
                .get("/api/stations/{stationId}", 충전소_ID)
                .then().log().all()
                .extract();
    }

    public static void 충전소_상세_정보를_검증한다(ExtractableResponse<Response> 응답, ChargeStation 충전소) {
        var response = 응답.as(ChargeStationSpecificResponse.class);
        assertThat(response).usingRecursiveComparison()
                .withEqualsForType((i, i2) -> i.compareTo(i2) == 0, BigDecimal.class)
                .withEqualsForType(LocalDateTime::isEqual, LocalDateTime.class)
                .isEqualTo(ChargeStationSpecificResponse.from(충전소));
    }
}
