package com.carffeine.carffeine.review.integration;

import com.carffeine.carffeine.review.domain.Review;
import com.carffeine.carffeine.review.infrastructure.dto.ReplyResponse;
import com.carffeine.carffeine.review.infrastructure.dto.ReplyResponses;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

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

    public static ExtractableResponse<Response> 답글을_수정한다(String request, String token, Long 리뷰_ID, Long 답글_ID) {
        return RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .body(new CreateReplyRequest(request))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .patch("/reviews/{reviewId}/replies/{replyId}", 리뷰_ID, 답글_ID)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 답글을_삭제한다(String token, Long 리뷰_ID, Long 답글_ID) {
        return RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .delete("/reviews/{reviewId}/replies/{replyId}", 리뷰_ID, 답글_ID)
                .then().log().all()
                .extract();
    }

    public static Long 답글_ID를_반환한다(ExtractableResponse<Response> 조회_응답) {
        ReplyResponses replyResponse = 조회_응답.as(ReplyResponses.class);
        return replyResponse.replies().get(0).reviewId();
    }

    public static void 답글이_삭제되었는지_검증한다(ExtractableResponse<Response> 응답) {
        ReplyResponses replyResponses = 응답.as(ReplyResponses.class);
        assertThat(replyResponses.replies().stream().map(ReplyResponse::isDeleted)).containsExactly(true);
    }

    public static void 답글이_수정되었는지_검증한다(ExtractableResponse<Response> 응답, String 수정할_답글) {
        ReplyResponses replyResponses = 응답.as(ReplyResponses.class);
        assertThat(replyResponses.replies().stream().map(ReplyResponse::content)).containsExactly(수정할_답글);
    }
}
