package com.carffeine.carffeine.filter.integration;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import org.junit.jupiter.api.function.Executable;
import org.springframework.http.HttpHeaders;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class FilterIntegrationFixture extends IntegrationTest {

    protected <T> ExtractableResponse 생성요청(String url, T request, String accessToken) {
        return RestAssured.given().log().all()
                .body(request)
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when()
                .post(url)
                .then().log().all()
                .extract();
    }

    protected <T> ExtractableResponse 제거요청(String url, String accessToken) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .when()
                .delete(url)
                .then().log().all()
                .extract();
    }

    protected <T> ExtractableResponse 모든_필터를_조회한다(String url, String accessToken) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, accessToken)
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
