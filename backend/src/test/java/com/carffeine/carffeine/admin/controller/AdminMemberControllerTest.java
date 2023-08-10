package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.admin.service.dto.MemberRoleUpdateRequest;
import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.member.fixture.MemberFixture;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(AdminMemberController.class)
@AutoConfigureRestDocs
public class AdminMemberControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 회원_목록을_요청한다() throws Exception {
        // given
        given(adminMemberService.getMembers(any(), any()))
                .willReturn(new PageImpl<>(List.of(
                        MemberFixture.일반_회원,
                        MemberFixture.관리자_회원
                ), Pageable.ofSize(2), 2));

        // when
        mockMvc.perform(get("/admin/members")
                        .param("page", "0")
                        .param("size", "2")
                        .header(HttpHeaders.AUTHORIZATION, "token~~"))
                .andExpect(status().isOk())
                .andDo(customDocument("get-members",
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기")
                        ),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("lastPage").description("전체 페이지 수"),
                                subsectionWithPath("elements").description("리스트의 요소들")
                                        .type(JsonFieldType.ARRAY),
                                subsectionWithPath("elements[].id").description("멤버 ID"),
                                subsectionWithPath("elements[].email").description("이메일"),
                                subsectionWithPath("elements[].role").description("권한")
                        )
                ));
    }

    @Test
    void testUpdateRole() throws Exception {
        // given
        MemberRoleUpdateRequest updateRequest = new MemberRoleUpdateRequest("admin");

        // when & then
        mockMvc.perform(patch("/admin/members/{memberId}", 123L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest))
                        .header(HttpHeaders.AUTHORIZATION, "token~~"))
                .andExpect(status().isNoContent())
                .andDo(customDocument("update-member-role",
                        pathParameters(parameterWithName("memberId").description("멤버 ID")),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        requestFields(
                                fieldWithPath("role").description("회원 권한")
                        )
                ));
    }
}
