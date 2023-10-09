package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.CityResponse;
import com.carffeine.carffeine.admin.service.dto.CityCreateRequest;
import com.carffeine.carffeine.admin.service.dto.CityUpdateRequest;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.city.City;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

class AdminCityIntegrationTestFixture {

    protected static ExtractableResponse<Response> 토큰과_함께_페이지_번호와_사이즈로_도시_정보를_요청한다(String 토큰, int 페이지_번호, int 페이지_사이즈) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .param("page", 페이지_번호)
                .param("size", 페이지_사이즈)
                .get("/admin/cities")
                .then().log().all()
                .extract();
    }

    protected static void 도시_정보_페이지를_검증한다(ExtractableResponse<Response> extract, int 페이지_사이즈, City... 도시들) {
        CustomPage<CityResponse> response = extract.as(new TypeRef<>() {
        });

        List<CityResponse> result = Arrays.stream(도시들)
                .map(CityResponse::from)
                .toList();

        assertSoftly(softly -> {
            softly.assertThat(response.elements()).usingRecursiveComparison()
                    .isEqualTo(result);
            softly.assertThat(response.lastPage()).isEqualTo(페이지_사이즈);
        });
    }

    protected static <T> ExtractableResponse 토큰과_함께_도시_정보_저장(String 토큰, T 도시정보) {
        return RestAssured.given().log().all()
                .body(도시정보)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .when()
                .post("/admin/cities")
                .then().log().all()
                .extract();
    }

    protected static void 생성된_도시_정보를_검증한다(ExtractableResponse<Response> extract, CityCreateRequest 도시_생성_요청정보) {
        CityResponse result = extract.as(CityResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(result.name()).isEqualTo(도시_생성_요청정보.name());
            softly.assertThat(result.latitude()).isEqualTo(도시_생성_요청정보.latitude());
            softly.assertThat(result.longitude()).isEqualTo(도시_생성_요청정보.longitude());
        });
    }

    protected static <T> ExtractableResponse 토큰과_함께_도시_정보_업데이트(String 토큰, T 도시정보) {
        return RestAssured.given().log().all()
                .body(도시정보)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .when()
                .patch("/admin/cities/1")
                .then().log().all()
                .extract();
    }

    protected static void 업데이트된_도시_정보를_검증한다(ExtractableResponse<Response> extract, CityUpdateRequest 도시_생성_요청정보) {
        CityResponse result = extract.as(CityResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(result.name()).isEqualTo(도시_생성_요청정보.name());
            softly.assertThat(result.latitude()).isEqualTo(도시_생성_요청정보.latitude());
            softly.assertThat(result.longitude()).isEqualTo(도시_생성_요청정보.longitude());
        });
    }

    protected static <T> ExtractableResponse 토큰과_함께_도시_정보를_제거한다(String 토큰) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .when()
                .delete("/admin/cities/1")
                .then().log().all()
                .extract();
    }

    protected static void 제거된_도시_정보를_검증한다(ExtractableResponse<Response> extract) {
        assertThat(extract.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    protected static CityCreateRequest 신천동_정보_생성() {
        return new CityCreateRequest("신천동", BigDecimal.valueOf(37.11), BigDecimal.valueOf(37.11));
    }

    protected static CityUpdateRequest 업데이트_정보_생성() {
        return new CityUpdateRequest("신천동", BigDecimal.valueOf(37.11), BigDecimal.valueOf(37.11));
    }
}
