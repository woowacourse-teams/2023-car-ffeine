package com.carffeine.carffeine.station.controller.review;

import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.station.domain.review.Review;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.선릉역_충전소_리뷰_별4_15글자;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(ReviewController.class)
@AutoConfigureRestDocs
public class ReviewControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

//    @Test
//    void 충전소의_리뷰를_등록한다() throws Exception {
//        // given
//        String stationId = "ME101010";
//        long memberId = 1L;
//        CreateReviewRequest createReviewRequest = new CreateReviewRequest();
//        // createReviewRequest에 필요한 데이터를 설정
//
//        // when
//        mockMvc.perform(post("/stations/{stationId}/review", stationId)
//                        .param("memberId", String.valueOf(memberId))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(createReviewRequest)))
//                .andExpect(status().isNoContent())
//                .andDo(customDocument("save-review")); // 문서화 추가
//
//        // then
//        verify(reviewService, times(1)).saveReview(createReviewRequest, stationId, memberId);
//    }

    @Test
    void 충전소의_리뷰를_조회한다() throws Exception {
        // when
        String stationId = "ME101010";
        Review review = 선릉역_충전소_리뷰_별4_15글자.get();
        review.setUpdatedAt(LocalDateTime.of(2023, 8, 11, 23, 34, 8));
        List<Review> reviews = List.of(review);
        when(reviewService.findAllReviews(stationId, 1)).thenReturn(reviews);

        // then
        mockMvc.perform(get("/stations/{stationId}/reviews", stationId))
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
                                fieldWithPath("reviews[].isDeleted").type(JsonFieldType.BOOLEAN).description("삭제 여부")
                        )
                ));
    }
}
