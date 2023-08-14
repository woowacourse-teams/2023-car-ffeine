package com.carffeine.carffeine.station.integration.review;

import com.carffeine.carffeine.station.domain.review.Reply;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("NonAsciiCharacters")
public class ReplyIntegrationTestFixture {

    public static ExtractableResponse<Response> 답글을_등록한다(CreateReplyRequest request, String token, Review review) {
        return RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .body(getParams(request))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/reviews/{reviewId}/replies", review.getId())
                .then().log().all()
                .extract();
    }

    private static Map<String, String> getParams(CreateReplyRequest request) {
        Map<String, String> params = new HashMap<>();
        params.put("content", request.content());
        return params;
    }

    public static ExtractableResponse<Response> 답글을_조회한다(Review review) {
        return RestAssured.given().log().all()
                .get("/reviews/{reviewId}/replies", review.getId())
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 답글을_수정한다(CreateReplyRequest request, String token, Review review, Reply reply) {
        return RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .body(getParams(request))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .patch("/reviews/{reviewId}/replies/{replyId}", review.getId(), reply.getId())
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 답글을_삭제한다(String token, Review review, Reply reply) {
        return RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .delete("/reviews/{reviewId}/replies/{replyId}", review.getId(), reply.getId())
                .then().log().all()
                .extract();
    }
}
