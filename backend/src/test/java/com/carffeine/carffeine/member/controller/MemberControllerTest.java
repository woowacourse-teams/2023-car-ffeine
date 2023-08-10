package com.carffeine.carffeine.member.controller;

import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeRequest;
import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.member.controller.dto.CarPersonalizationRequest;
import com.carffeine.carffeine.member.controller.dto.MemberCustomFilterRequest;
import com.carffeine.carffeine.member.controller.dto.MemberResponse;
import com.carffeine.carffeine.member.domain.personalization.Personalization;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHeaders;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static com.carffeine.carffeine.member.fixture.MemberFixture.createMember;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(MemberController.class)
class MemberControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 자신의_차량_정보를_등록한다() throws Exception {
        // given
        CarPersonalizationRequest request = new CarPersonalizationRequest("아이오닉5", "2022-A");
        Personalization personalization = Personalization.from(createMember(), request.name(), request.year());

        // when
        when(memberService.uploadCarPersonalization(any(), any()))
                .thenReturn(personalization);

        // then
        mockMvc.perform(post("/members")
                        .header(HttpHeaders.AUTHORIZATION, "token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                ).andExpect(status().isCreated())
                .andDo(customDocument("upload_my_car_info",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("year").type(JsonFieldType.STRING).description("차량 연식")
                        ),
                        responseFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("year").type(JsonFieldType.STRING).description("차량 연식")
                        )
                ));
    }

    @Test
    void 자신의_차량_정보를_조회한다() throws Exception {
        // given
        MemberResponse memberResponse = MemberResponse.of(
                1L,
                Personalization.from(createMember(), "아이오닉5", "2022-A")
        );

        // when
        when(memberService.findMemberPersonalization(any()))
                .thenReturn(memberResponse);

        // then
        mockMvc.perform(get("/members")
                        .header(HttpHeaders.AUTHORIZATION, "token")
                ).andExpect(status().isOk())
                .andDo(customDocument("find_my_car_info",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER).description("사용자 id"),
                                fieldWithPath("car.name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("car.year").type(JsonFieldType.STRING).description("차량 연식")
                        )
                ));
    }

    @Test
    void 자신의_커스텀_필터를_등록한다() throws Exception {
        // given
        MemberCustomFilterRequest request = new MemberCustomFilterRequest(
                List.of(new CompanyNameRequest("HG", "환경부")),
                List.of(BigDecimal.valueOf(2)),
                List.of(new ConnectorTypeRequest("DC_COMBO", "xxx충전기"))
        );

        FiltersResponse filtersResponse = FiltersResponse.of(
                List.of(CompanyName.from("HG", "환경부")),
                List.of(Capacity.from(BigDecimal.valueOf(2))),
                List.of(ConnectorType.from("DC_COMBO", "xxx충전기"))
        );

        when(memberService.addCustomFiltersByMember(any(), any()))
                .thenReturn(filtersResponse);

        // when & then
        mockMvc.perform(post("/members/filters")
                        .header(HttpHeaders.AUTHORIZATION, "token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                ).andExpect(status().isCreated())
                .andDo(customDocument("add_custom_filter_by_member",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        requestFields(
                                fieldWithPath("companyNames[0].key").type(JsonFieldType.STRING).description("충전소 키"),
                                fieldWithPath("companyNames[0].value").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전속도"),
                                fieldWithPath("connectorTypes[0].key").type(JsonFieldType.STRING).description("커넥터 키"),
                                fieldWithPath("connectorTypes[0].value").type(JsonFieldType.STRING).description("커넥터 이름")
                        ),
                        responseFields(
                                fieldWithPath("companyNames[0].key").type(JsonFieldType.STRING).description("충전소 키"),
                                fieldWithPath("companyNames[0].value").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전속도"),
                                fieldWithPath("connectorTypes[0].key").type(JsonFieldType.STRING).description("커넥터 키"),
                                fieldWithPath("connectorTypes[0].value").type(JsonFieldType.STRING).description("커넥터 이름")
                        )
                ));
    }

    @Test
    void 자신의_커스텀_필터를_조회한다() throws Exception {
        // given
        FiltersResponse filtersResponse = FiltersResponse.of(
                List.of(CompanyName.from("HG", "환경부")),
                List.of(Capacity.from(BigDecimal.valueOf(2))),
                List.of(ConnectorType.from("DC_COMBO", "xxx충전기"))
        );

        // when
        when(memberService.findFilterChooseByMember(any()))
                .thenReturn(filtersResponse);

        // when & then
        mockMvc.perform(get("/members/filters")
                        .header(HttpHeaders.AUTHORIZATION, "token")
                ).andExpect(status().isOk())
                .andDo(customDocument("find_custom_filters_by_member",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("companyNames[0].key").description("충전소 키"),
                                fieldWithPath("companyNames[0].value").description("충전소 이름"),
                                fieldWithPath("capacities[0]").description("충전속도"),
                                fieldWithPath("connectorTypes[0].key").description("커넥터 키"),
                                fieldWithPath("connectorTypes[0].value").description("커넥터 이름")
                        )
                ));
    }
}
