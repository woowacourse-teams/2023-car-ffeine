package com.carffeine.carffeine.member.integration;

import com.carffeine.carffeine.member.controller.dto.CarPersonalizationRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.apache.http.HttpHeaders;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.function.Executable;

@SuppressWarnings("NonAsciiCharacters")
public abstract class MemberIntegrationFixture {

    public static ExtractableResponse<Response> 자신의_차량_정보를_등록_요청(String token, CarPersonalizationRequest request) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, token)
                .body(request)
                .contentType(ContentType.JSON)
                .when()
                .post("/members")
                .then().log().all()
                .extract();
    }

    public static <T> Executable 단일_검증(final T actual, final T expected) {
        return () -> AssertionsForClassTypes.assertThat(actual).isEqualTo(expected);
    }
}
