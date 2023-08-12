package com.carffeine.carffeine.station.controller.review;

import com.carffeine.carffeine.common.domain.BaseEntity;
import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_별4_15글자;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(ReviewController.class)
@AutoConfigureRestDocs
public class ReviewControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static void setReflection(Page<Review> reviews, String date) {
        ReflectionTestUtils.setField(
                reviews.get().toList().get(0),
                BaseEntity.class,
                date,
                LocalDateTime.of(23, 8, 12, 19, 30, 18),
                LocalDateTime.class
        );
    }

    @Test
    void 충전소에_리뷰를_등록한다() throws Exception {
        // given
        Station station = 선릉역_충전소_충전기_2개_사용가능_1개;
        Member member = 일반_회원;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        Review review = 리뷰_별4_15글자;

        // when
        when(reviewService.saveReview(request, station.getStationId(), member.getId())).thenReturn(review);
        String jsonData = objectMapper.writeValueAsString(request);

        // then
        mockMvc.perform(post("/stations/{stationId}/reviews", station.getStationId())
                        .header(HttpHeaders.AUTHORIZATION, "token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(jsonData)
                )
                .andExpect(status().isNoContent())
                .andDo(customDocument("save-review",
                        requestHeaders(headerWithName("Authorization").description("회원 id")),
                        pathParameters(parameterWithName("stationId").description("충전소 id")),
                        requestFields(
                                fieldWithPath("ratings").type(JsonFieldType.NUMBER).description("별점"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                        ))
                );
    }

    @Test
    void 충전소의_리뷰를_조회한다() throws Exception {
        // given
        String stationId = "ME101010";

        Page<Review> reviews = new PageImpl<>(List.of(리뷰_별4_15글자));

        setReflection(reviews, "createdAt");
        setReflection(reviews, "updatedAt");

        // when
        when(reviewService.findAllReviews(eq(stationId), any(Pageable.class))).thenReturn(reviews);

        // then
        mockMvc.perform(get("/stations/{stationId}/reviews", stationId)
                        .param("page", "0")
                        .param("scope", "10")
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.reviews", hasSize(1)))
                .andDo(customDocument("find-reviews",
                        pathParameters(
                                parameterWithName("stationId").description("충전소 ID")
                        ),
                        responseFields(
                                fieldWithPath("reviews").type(JsonFieldType.ARRAY).description("리뷰들"),
                                fieldWithPath("reviews[].reviewId").type(JsonFieldType.NUMBER).description("리뷰 ID"),
                                fieldWithPath("reviews[].memberId").type(JsonFieldType.NUMBER).description("작성자 ID"),
                                fieldWithPath("reviews[].latestUpdateDate").type(JsonFieldType.STRING).description("최신 업데이트 날짜"),
                                fieldWithPath("reviews[].ratings").type(JsonFieldType.NUMBER).description("별점"),
                                fieldWithPath("reviews[].content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("reviews[].isUpdated").type(JsonFieldType.BOOLEAN).description("수정 여부"),
                                fieldWithPath("reviews[].isDeleted").type(JsonFieldType.BOOLEAN).description("삭제 여부"),
                                fieldWithPath("nextPage").type(JsonFieldType.NUMBER).description("다음 페이지")
                        )
                ));
    }

    @Test
    void 충전소의_리뷰를_수정한다() throws Exception {
        // given
        Station station = 선릉역_충전소_충전기_2개_사용가능_1개;
        Member member = 일반_회원;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        Review review = 리뷰_별4_15글자;

        // when
        when(reviewService.saveReview(request, station.getStationId(), member.getId())).thenReturn(review);
        String jsonData = objectMapper.writeValueAsString(request);

        // then
        mockMvc.perform(patch("/reviews/{reviewId}", review.getId())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + member.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(jsonData)
                )
                .andExpect(status().isNoContent())
                .andDo(customDocument("update-review",
                        requestHeaders(headerWithName("Authorization").description("회원 id")),
                        pathParameters(parameterWithName("reviewId").description("충전소 id")),
                        requestFields(
                                fieldWithPath("ratings").type(JsonFieldType.NUMBER).description("별점"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                        ))
                );
    }

    @Test
    void 충전소의_리뷰를_삭제한다() throws Exception {
        // given
        Station station = 선릉역_충전소_충전기_2개_사용가능_1개;
        Member member = 일반_회원;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        Review review = 리뷰_별4_15글자;

        // when
        when(reviewService.saveReview(request, station.getStationId(), member.getId())).thenReturn(review);
        String jsonData = objectMapper.writeValueAsString(request);

        // then
        mockMvc.perform(delete("/reviews/{reviewId}", review.getId())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + member.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(jsonData)
                )
                .andExpect(status().isNoContent())
                .andDo(customDocument("delete-review",
                        requestHeaders(headerWithName("Authorization").description("회원 id")),
                        pathParameters(parameterWithName("reviewId").description("충전소 id")),
                        requestFields(
                                fieldWithPath("ratings").type(JsonFieldType.NUMBER).description("별점"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                        ))
                );
    }
}
