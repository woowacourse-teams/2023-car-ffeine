package com.carffeine.carffeine.review.integration;

import com.carffeine.carffeine.review.domain.Review;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("NonAsciiCharacters")
public class ReviewIntegrationTestFixture {

    public static ExtractableResponse<Response> 댓글을_등록한다(CreateReviewRequest request, String token, Station station) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(getParams(request))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/stations/{stationId}/reviews", station.getStationId())
                .then().log().all()
                .extract();
    }

    private static Map<String, String> getParams(CreateReviewRequest request) {
        Map<String, String> params = new HashMap<>();
        params.put("ratings", String.valueOf(request.ratings()));
        params.put("content", request.content());
        return params;
    }

    public static ExtractableResponse<Response> 댓글을_조회한다(Station station) {
        return RestAssured.given().log().all()
                .get("/stations/{stationId}/reviews", station.getStationId())
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 댓글을_수정한다(CreateReviewRequest request, String token, Review review) {
        return RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .body(getParams(request))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .patch("/reviews/{reviewId}", review.getId())
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 댓글을_삭제한다(String token, Review review) {
        return RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .delete("/reviews/{reviewId}", review.getId())
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 통합_별점을_조회한다(Station station) {
        return RestAssured.given().log().all()
                .get("/stations/{stationId}/total-ratings", station.getStationId())
                .then().log().all()
                .extract();
    }
}
