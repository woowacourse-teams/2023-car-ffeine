package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.admin.service.dto.CityCreateRequest;
import com.carffeine.carffeine.admin.service.dto.CityUpdateRequest;
import com.carffeine.carffeine.city.domain.City;
import com.carffeine.carffeine.station.domain.Latitude;
import com.carffeine.carffeine.station.domain.Longitude;
import com.carffeine.support.MockBeanInjection;
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

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.fixture.city.CityFixture.서울특별시_송파구_잠실동_정보;
import static com.carffeine.support.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
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
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(AdminCityController.class)
class AdminCityControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 모든_도시를_조회한다() throws Exception {
        // given
        given(adminCityService.findAll(any(), any())).willReturn(
                new PageImpl<>(
                        List.of(서울특별시_송파구_잠실동_정보),
                        Pageable.ofSize(2), 1)
        );

        // when & then
        mockMvc.perform(get("/admin/cities")
                        .param("page", "0")
                        .param("size", "2")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token xxx"))
                .andExpect(status().isOk())
                .andDo(customDocument("find_all_cities",
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기")
                        ),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("lastPage").description("전체 페이지 수"),
                                subsectionWithPath("elements").description("리스트의 요소들")
                                        .type(JsonFieldType.ARRAY),
                                subsectionWithPath("elements[].id").description("도시 ID"),
                                subsectionWithPath("elements[].name").description("도시 지명"),
                                subsectionWithPath("elements[].latitude").description("위도"),
                                subsectionWithPath("elements[].longitude").description("경도")
                        )
                ));
    }

    @Test
    void 도시를_저장한다() throws Exception {
        // given
        CityCreateRequest req = new CityCreateRequest("송파구", BigDecimal.valueOf(37.11), BigDecimal.valueOf(37.11));
        when(adminCityService.save(any(), any())).thenReturn(
                City.builder()
                        .id(1L)
                        .name(req.name())
                        .latitude(Latitude.from(req.latitude()))
                        .longitude(Longitude.from(req.longitude()))
                        .build()
        );

        // when & then
        mockMvc.perform(post("/admin/cities")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer xxx")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andDo(customDocument("create_city",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        requestFields(
                                fieldWithPath("name").description("도시 지명"),
                                fieldWithPath("longitude").description("경도"),
                                fieldWithPath("latitude").description("위도")
                        ),
                        responseFields(
                                fieldWithPath("id").description("도시 id"),
                                fieldWithPath("name").description("도시 지명"),
                                fieldWithPath("longitude").description("경도"),
                                fieldWithPath("latitude").description("위도")
                        )
                ));
    }

    @Test
    void 도시를_업데이트한다() throws Exception {
        // given
        CityUpdateRequest req = new CityUpdateRequest("송파구", BigDecimal.valueOf(37.11), BigDecimal.valueOf(37.11));
        City city = City.builder()
                .id(1L)
                .name(req.name())
                .longitude(Longitude.from(req.longitude()))
                .latitude(Latitude.from(req.latitude()))
                .build();

        when(adminCityService.update(any(), any(), any()))
                .thenReturn(city);

        // when & then
        mockMvc.perform(patch("/admin/cities/{cityId}", "1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer xxx")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andDo(customDocument("update_city",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        pathParameters(parameterWithName("cityId").description("도시 id")),
                        requestFields(
                                fieldWithPath("name").description("도시 지명"),
                                fieldWithPath("longitude").description("경도"),
                                fieldWithPath("latitude").description("위도")
                        ),
                        responseFields(
                                fieldWithPath("id").description("도시 id"),
                                fieldWithPath("name").description("도시 지명"),
                                fieldWithPath("longitude").description("경도"),
                                fieldWithPath("latitude").description("위도")
                        )
                ));
    }

    @Test
    void 도시를_제거한다() throws Exception {
        // when & then
        mockMvc.perform(delete("/admin/cities/{cityId}", 1)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer xxx"))
                .andExpect(status().isNoContent())
                .andDo(customDocument("delete_city",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        pathParameters(parameterWithName("cityId").description("도시 id"))
                ));
    }
}
