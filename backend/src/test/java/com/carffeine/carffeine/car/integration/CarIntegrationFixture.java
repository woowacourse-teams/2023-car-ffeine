package com.carffeine.carffeine.car.integration;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import org.junit.jupiter.api.function.Executable;
import org.springframework.http.HttpHeaders;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class CarIntegrationFixture extends IntegrationTest {

    protected <T> ExtractableResponse 차량_생성_요청(String url, T request, String accessToken) {
        return RestAssured.given().log().all()
                .body(request)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when()
                .post(url)
                .then().log().all()
                .extract();
    }

    protected <T> ExtractableResponse 차량_제거_요청(String url, String accessToken) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when()
                .delete(url)
                .then().log().all()
                .extract();
    }

    protected <T> ExtractableResponse 차량_조회_요청(String url) {
        return RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when()
                .get(url)
                .then().log().all()
                .extract();
    }

    protected <T> Executable 단일_검증(T actual, T expected) {
        return () -> assertThat(actual).isEqualTo(expected);
    }
}
