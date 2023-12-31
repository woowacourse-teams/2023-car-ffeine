package com.carffeine.carffeine.filter.controller;

import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.domain.MemberFilter;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.fixture.MemberFixture;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.filter.fixture.FilterFixture.createCapacityFilter;
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createCompanyFilter;
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createConnectorTypeFilter;
import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(FilterController.class)
class FilterControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 등록된_필터를_모두_조회한다() throws Exception {
        // given
        List<Filter> filters = new ArrayList<>(
                List.of(
                        Filter.of("충전소 회사", FilterType.COMPANY.getName()),
                        Filter.of("충전소 회사2", FilterType.COMPANY.getName()),
                        Filter.of("2", FilterType.CAPACITY.getName()),
                        Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName())
                )
        );

        // when
        when(filterService.findAllFilters()).thenReturn(filters);

        // then
        mockMvc.perform(get("/filters"))
                .andExpect(status().isOk())
                .andDo(customDocument("find_all_filters",
                        responseFields(
                                fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                        )
                ));
    }

    @Test
    void 필터를_등록한다() throws Exception {
        // given
        FiltersRequest filtersRequest = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "충전소 회사"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        List<Filter> filters = List.of(
                Filter.of("충전소 회사", FilterType.COMPANY.getName()),
                Filter.of("2.00", FilterType.CAPACITY.getName()),
                Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName())
        );

        // when
        when(filterService.addFilters(any(), eq(filtersRequest))).thenReturn(filters);

        // then
        mockMvc.perform(post("/filters")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtersRequest))
                ).andExpect(status().isCreated())
                .andDo(customDocument("add_filters",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        requestFields(
                                fieldWithPath("filters[0].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[0].name").type(JsonFieldType.STRING).description("필터 이름"),
                                fieldWithPath("filters[1].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[1].name").type(JsonFieldType.STRING).description("필터 이름"),
                                fieldWithPath("filters[2].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[2].name").type(JsonFieldType.STRING).description("필터 이름")
                        ),
                        responseFields(
                                fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                        )
                ));
    }

    @Test
    void 필터를_제거한다() throws Exception {
        // then
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/filters/{filterName}", "filterName")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~"))
                .andExpect(status().isNoContent())
                .andDo(customDocument("delete_filter",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        pathParameters(
                                parameterWithName("filterName").description("필터 이름")
                        )
                ));
    }

    @Test
    void 차량_필터를_모두_조회한다() throws Exception {
        // given
        List<Filter> filters = List.of(
                createCompanyFilter(),
                createConnectorTypeFilter(),
                createCapacityFilter()
        );
        FiltersResponse response = FiltersResponse.from(filters);

        // when
        when(filterQueryService.findCarFilters(anyLong())).thenReturn(response);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/cars/{carId}/filters", 1L))
                .andExpect(status().isOk())
                .andDo(customDocument("find_car_filters",
                        pathParameters(parameterWithName("carId").description("차량 id")),
                        responseFields(
                                fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                        )
                ));
    }

    @Test
    void 차량_필터를_저장한다() throws Exception {
        // given
        List<Filter> filters = List.of(
                createCompanyFilter(),
                createConnectorTypeFilter(),
                createCapacityFilter()
        );

        FiltersRequest request = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "HG"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        // when
        when(filterService.addCarFilters(anyLong(), anyLong(), any())).thenReturn(filters);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.post("/cars/{carId}/filters", 1L)
                        .header(AUTHORIZATION, "Bearer token~~")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isCreated())
                .andDo(customDocument("add_car_filters",
                        requestHeaders(headerWithName(org.apache.http.HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        pathParameters(parameterWithName("carId").description("차량 id")),
                        requestFields(
                                fieldWithPath("filters[0].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[0].name").type(JsonFieldType.STRING).description("필터 이름"),
                                fieldWithPath("filters[1].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[1].name").type(JsonFieldType.STRING).description("필터 이름"),
                                fieldWithPath("filters[2].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[2].name").type(JsonFieldType.STRING).description("필터 이름")
                        ),
                        responseFields(
                                fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                        )
                ));
    }

    @Test
    void 회원의_모든_필터를_조회한다() throws Exception {
        // given
        List<Filter> filters = List.of(
                Filter.of("충전소 회사", FilterType.COMPANY.getName()),
                Filter.of("충전소 회사2", FilterType.COMPANY.getName()),
                Filter.of("2", FilterType.CAPACITY.getName()),
                Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName())
        );

        // when
        when(filterService.findMemberFilters(any(), any())).thenReturn(filters);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/members/{memberId}/filters", 1L)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~")
                ).andExpect(status().isOk())
                .andDo(customDocument("find_member_filters",
                                requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                                pathParameters(parameterWithName("memberId").description("Member id")),
                                responseFields(
                                        fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                        fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                        fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                                )
                        )
                );
    }

    @Test
    void 회원의_선호_필터를_등록한다() throws Exception {
        // given
        Member member = MemberFixture.일반_회원;

        FiltersRequest filtersRequest = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "충전소 회사"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        List<MemberFilter> memberFilters = List.of(
                new MemberFilter(member, Filter.of("충전소 회사", FilterType.COMPANY.getName())),
                new MemberFilter(member, Filter.of("2", FilterType.CAPACITY.getName())),
                new MemberFilter(member, Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName()))
        );

        // when
        when(filterService.addMemberFilters(any(), any(), any())).thenReturn(memberFilters);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.post("/members/{memberId}/filters", 1L)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(filtersRequest))
                ).andExpect(status().isOk())
                .andDo(customDocument("add_member_filters",
                                requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                                pathParameters(parameterWithName("memberId").description("Member id")),
                                requestFields(
                                        fieldWithPath("filters[0].type").type(JsonFieldType.STRING).description("필터 종류"),
                                        fieldWithPath("filters[0].name").type(JsonFieldType.STRING).description("필터 이름"),
                                        fieldWithPath("filters[1].type").type(JsonFieldType.STRING).description("필터 종류"),
                                        fieldWithPath("filters[1].name").type(JsonFieldType.STRING).description("필터 이름"),
                                        fieldWithPath("filters[2].type").type(JsonFieldType.STRING).description("필터 종류"),
                                        fieldWithPath("filters[2].name").type(JsonFieldType.STRING).description("필터 이름")
                                ),
                                responseFields(
                                        fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                        fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                        fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                                )
                        )
                );
    }
}
