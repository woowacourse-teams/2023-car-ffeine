package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.StationPageResponse;
import com.carffeine.carffeine.admin.controller.dto.StationResponse;
import com.carffeine.carffeine.admin.service.dto.StationUpdateRequest;
import com.carffeine.carffeine.station.domain.Station;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

public class AdminStationIntegrationTestFixture {

    public static ExtractableResponse<Response> 토큰과_함께_페이지_번호와_사이즈로_충전소_정보를_요청한다(String 토큰, int 페이지_번호, int 페이지_사이즈) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .param("page", 페이지_번호)
                .param("size", 페이지_사이즈)
                .get("/admin/stations")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 토큰과_함께_충전소_이름과_페이지_번호와_사이즈로_충전소_정보를_요청한다(String 토큰, String 검색어, int 페이지_번호, int 페이지_사이즈) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .param("page", 페이지_번호)
                .param("size", 페이지_사이즈)
                .param("q", 검색어)
                .get("/admin/stations")
                .then().log().all()
                .extract();
    }

    public static void 충전소_정보_페이지를_검증한다(ExtractableResponse<Response> extract, int 페이지_사이즈, Station... 충전소들) {
        CustomPage<StationPageResponse> response = extract.as(new TypeRef<>() {
        });
        List<StationPageResponse> result = Arrays.stream(충전소들)
                .map(StationPageResponse::from)
                .toList();
        assertSoftly(softly -> {
            softly.assertThat(response.elements()).usingRecursiveComparison()
                    .withEqualsForType((i, i2) -> i.compareTo(i2) == 0, BigDecimal.class)
                    .isEqualTo(result);
            softly.assertThat(response.lastPage()).isEqualTo(페이지_사이즈);
        });
    }

    public static void 충전소_상세_정보_응답을_검증한다(ExtractableResponse<Response> 응답, Station 충전소) {
        var response = 응답.as(StationResponse.class);
        assertThat(response).usingRecursiveComparison()
                .withEqualsForType((i, i2) -> i.compareTo(i2) == 0, BigDecimal.class)
                .withEqualsForType(LocalDateTime::isEqual, LocalDateTime.class)
                .isEqualTo(StationResponse.from(충전소));
    }

    public static ExtractableResponse<Response> 토큰과_충전소_ID로_충전소_정보를_요청한다(String 토큰, String 충전소_ID) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .get("/admin/stations/{stationId}", 충전소_ID)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 토큰과_충전소_ID로_충전소_정보를_수정한다(String 토큰, String 충전소_ID, StationUpdateRequest 수정_요청) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .contentType("application/x-www-form-urlencoded")
                .formParam("stationName", 수정_요청.stationName())
                .formParam("companyName", 수정_요청.companyName())
                .formParam("contact", 수정_요청.contact())
                .formParam("detailLocation", 수정_요청.detailLocation())
                .formParam("isParkingFree", 수정_요청.isParkingFree())
                .formParam("isPrivate", 수정_요청.isPrivate())
                .formParam("operationTime", 수정_요청.operationTime())
                .formParam("privateReason", 수정_요청.privateReason())
                .formParam("stationState", 수정_요청.stationState())
                .formParam("address", 수정_요청.address())
                .formParam("latitude", 수정_요청.latitude())
                .formParam("longitude", 수정_요청.longitude())
                .patch("/admin/stations/{stationId}", 충전소_ID)
                .then().log().all()
                .extract();
    }

    public static void 충전소가_수정된_응답을_검증한다(ExtractableResponse<Response> 응답, StationUpdateRequest 변경할_충전소_정보) {
        var response = 응답.as(StationResponse.class);

        assertThat(response).usingRecursiveComparison()
                .ignoringFields("chargers")
                .ignoringFields("stationId")
                .withEqualsForType((i, i2) -> i.compareTo(i2) == 0, BigDecimal.class)
                .withEqualsForType(LocalDateTime::isEqual, LocalDateTime.class)
                .isEqualTo(StationResponse.from(변경할_충전소_정보.toDomain()));
    }

    public static StationUpdateRequest 수정할_충전소_정보() {
        return new StationUpdateRequest(
                "Example Station",
                "ABC Company",
                "010-2222-1111",
                "123 Example Street",
                true,
                false,
                "08:00 AM - 06:00 PM",
                "Private reason details",
                "Operational",
                "123 Example Address",
                new BigDecimal("37.12345"),
                new BigDecimal("122.67890")
        );
    }
}
