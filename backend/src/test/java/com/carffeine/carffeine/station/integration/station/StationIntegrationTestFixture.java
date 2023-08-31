package com.carffeine.carffeine.station.integration.station;

import com.carffeine.carffeine.helper.integration.AcceptanceTestFixture;
import com.carffeine.carffeine.station.controller.station.dto.StationsSimpleResponse;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SuppressWarnings("NonAsciiCharacters")
public abstract class StationIntegrationTestFixture extends AcceptanceTestFixture {

    public static ExtractableResponse<Response> 좌표로_정보를_조회한다(CoordinateRequest request) {
        return RestAssured.given().log().all()
                .param("latitude", request.latitude())
                .param("longitude", request.longitude())
                .param("latitudeDelta", request.latitudeDelta())
                .param("longitudeDelta", request.longitudeDelta())
                .get("/stations")
                .then().log().all()
                .extract();
    }

    public static void 충전소_간단_정보를_검증한다(ExtractableResponse<Response> extract, Station... 충전소들) {
        var response = extract.as(StationsSimpleResponse.class);
        List<StationSimpleResponse> simpleResponses = List.of(충전소들).stream()
                .map(it -> new StationSimpleResponse(
                        it.getStationId(),
                        it.getStationName(),
                        it.getLatitude().getValue(),
                        it.getLongitude().getValue(),
                        it.isParkingFree(),
                        it.isPrivate(),
                        it.getAvailableCount(),
                        it.getChargers().stream().filter(charger -> charger.getCapacity().compareTo(BigDecimal.valueOf(50)) >= 0).count()
                )).toList();
        assertThat(response).usingRecursiveComparison()
                .withEqualsForType((i, i2) -> i.compareTo(i2) == 0, BigDecimal.class)
                .isEqualTo(new StationsSimpleResponse(simpleResponses));
    }

    public static CoordinateRequest 좌표_중심값과_화면_크기(String 중심_경도, String 중심_위도, String 화면_경도, String 화면_위도) {
        return new CoordinateRequest(new BigDecimal(중심_경도), new BigDecimal(중심_위도), new BigDecimal(화면_경도), new BigDecimal(화면_위도));
    }

    public static ExtractableResponse<Response> 충전소_ID로_상세_정보를_조회한다(String 충전소_ID) {
        return RestAssured.given().log().all()
                .get("/stations/{stationId}", 충전소_ID)
                .then().log().all()
                .extract();
    }

    public static void 충전소_상세_정보를_검증한다(ExtractableResponse<Response> 응답, Station station) {
        var response = 응답.as(StationSpecificResponse.class);
        assertThat(response).usingRecursiveComparison()
                .withEqualsForType((i, i2) -> i.compareTo(i2) == 0, BigDecimal.class)
                .withEqualsForType(LocalDateTime::isEqual, LocalDateTime.class)
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
    }
}
