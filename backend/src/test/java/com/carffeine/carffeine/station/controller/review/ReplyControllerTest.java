package com.carffeine.carffeine.station.controller.review;

import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.station.domain.review.Reply;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
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
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.답글_1개;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.바뀐_답글_1개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_별4_15글자;
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
@WebMvcTest(ReplyController.class)
@AutoConfigureRestDocs
public class ReplyControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 댓글에_답글을_등록한다() throws Exception {
        // given
        Member member = 일반_회원;
        Review review = 리뷰_별4_15글자;
        CreateReplyRequest replyRequest = new CreateReplyRequest("저도 그렇게 생각합니다");
        Reply reply = 답글_1개;

        // when
        when(replyService.saveReply(replyRequest, review.getId(), member.getId())).thenReturn(reply);
        String jsonData = objectMapper.writeValueAsString(replyRequest);

        // then
        mockMvc.perform(post("/reviews/{reviewId}/replies", review.getId())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(jsonData)
                )
                .andExpect(status().isNoContent())
                .andDo(customDocument("save-reply",
                        requestHeaders(headerWithName("Authorization").description("회원 ID")),
                        pathParameters(parameterWithName("reviewId").description("댓글 ID")),
                        requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                        ))
                );
    }

    @Test
    void 댓글의_답글을_조회한다() throws Exception {
        // given
        Long reviewId = 1L;
        Page<Reply> replies = new PageImpl<>(List.of(답글_1개));

        // when
        when(replyService.findAllReplies(eq(reviewId), any(Pageable.class))).thenReturn(replies);

        // then
        mockMvc.perform(get("/reviews/{reviewId}/replies", reviewId)
                        .param("page", "0")
                        .param("scope", "10")
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.replies", hasSize(1)))
                .andDo(customDocument("find-replies",
                        pathParameters(
                                parameterWithName("reviewId").description("댓글 ID")
                        ),
                        responseFields(
                                fieldWithPath("replies").type(JsonFieldType.ARRAY).description("리뷰들"),
                                fieldWithPath("replies[].replyId").type(JsonFieldType.NUMBER).description("답글 ID"),
                                fieldWithPath("replies[].reviewId").type(JsonFieldType.NUMBER).description("댓글 ID"),
                                fieldWithPath("replies[].memberId").type(JsonFieldType.NUMBER).description("작성자 ID"),
                                fieldWithPath("replies[].latestUpdateDate").type(JsonFieldType.STRING).description("최신 업데이트 날짜"),
                                fieldWithPath("replies[].content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("replies[].isUpdated").type(JsonFieldType.BOOLEAN).description("수정 여부"),
                                fieldWithPath("replies[].isDeleted").type(JsonFieldType.BOOLEAN).description("삭제 여부"),
                                fieldWithPath("nextPage").type(JsonFieldType.NUMBER).description("다음 페이지")
                        )
                ));
    }

    @Test
    void 댓글의_답글을_수정한다() throws Exception {
        // given
        Member member = 일반_회원;
        CreateReplyRequest request = new CreateReplyRequest("저는 그렇게 생각 안해요");
        Review review = 리뷰_별4_15글자;
        Reply reply = 바뀐_답글_1개;

        // when
        when(replyService.updateReply(request, review.getId(), member.getId())).thenReturn(reply);

        String jsonData = objectMapper.writeValueAsString(request);

        // then
        mockMvc.perform(patch("/reviews/{reviewId}/replies/{replyId}", review.getId(), reply.getId())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + member.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(jsonData)
                )
                .andExpect(status().isNoContent())
                .andDo(customDocument("update-reply",
                        requestHeaders(headerWithName("Authorization").description("회원 ID")),
                        pathParameters(
                                parameterWithName("reviewId").description("댓글 ID"),
                                parameterWithName("replyId").description("답글 ID")),
                        requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                        ))
                );
    }

    @Test
    void 댓글의_답글을_삭제한다() throws Exception {
        // given
        Member member = 일반_회원;
        Review review = 리뷰_별4_15글자;
        Reply reply = 답글_1개;

        // when
        when(replyService.deleteReply(member.getId(), reply.getId())).thenReturn(reply);

        // then
        mockMvc.perform(delete("/reviews/{reviewId}/replies/{replyId}", review.getId(), reply.getId())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + member.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent())
                .andDo(customDocument("delete-reply",
                        requestHeaders(headerWithName("Authorization").description("회원 ID")),
                        pathParameters(
                                parameterWithName("reviewId").description("댓글 ID"),
                                parameterWithName("replyId").description("답글 ID")))
                );
    }
}
