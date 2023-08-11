package com.carffeine.carffeine.filter.integration;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.function.Executable;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class FilterIntegrationFixture extends IntegrationTest {

    protected <T> ExtractableResponse 생성요청(final String url, final T request) {
        return RestAssured.given().log().all()
                .body(request)
                .contentType(ContentType.JSON)
                .when()
                .post(url)
                .then().log().all()
                .extract();
    }

    protected <T> ExtractableResponse 제거요청(final String url) {
        return RestAssured.given().log().all()
                .when()
                .delete(url)
                .then().log().all()
                .extract();
    }

    protected <T> ExtractableResponse 모든_필터를_조회한다(final String url) {
        return RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when()
                .get(url)
                .then().log().all()
                .extract();
    }

    protected <T> Executable 단일_검증(final T actual, final T expected) {
        return () -> assertThat(actual).isEqualTo(expected);
    }

    protected static Executable 정상_응답코드(final ExtractableResponse<Response> response) {
        return () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}
