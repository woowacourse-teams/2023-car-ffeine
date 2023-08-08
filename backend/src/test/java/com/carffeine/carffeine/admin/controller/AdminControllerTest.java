package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.helper.MockBeanInjection;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(AdminController.class)
@AutoConfigureRestDocs
public class AdminControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 충전소를_페이지_단위로_조회한다() throws Exception {
        //given
        given(adminService.getStations(any(), any(), any()))
                .willReturn(new PageImpl<>(List.of(선릉역_충전소_충전기_2개_사용가능_1개, 잠실역_충전소_충전기_2개_사용가능_1개), Pageable.ofSize(1), 2));

        // when && then
        mockMvc.perform(get("/admin/stations")
                        .param("page", "0")
                        .param("size", "1")
                        .param("q", "선릉역 충전소")
                        .header(HttpHeaders.AUTHORIZATION, "token~~")
                )
                .andExpect(status().isOk())
                .andDo(customDocument("get-stations",
                        requestParameters(
                                parameterWithName("q").description("검색어"),
                                parameterWithName("size").description("한 페이지에 받을 사이즈"),
                                parameterWithName("page").description("몇번째 페이지")
                        ),
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")
                        ),
                        responseFields(
                                fieldWithPath("lastPage").description("마지막 페이지"),
                                subsectionWithPath("elements").description("정보들"),
                                fieldWithPath("elements[].stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("elements[].stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("elements[].companyName").type(JsonFieldType.STRING).description("회사 이름"),
                                fieldWithPath("elements[].contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("elements[].detailLocation").type(JsonFieldType.STRING).description("상세 위치").optional(),
                                fieldWithPath("elements[].isParkingFree").type(JsonFieldType.BOOLEAN).description("주차 여부"),
                                fieldWithPath("elements[].isPrivate").type(JsonFieldType.BOOLEAN).description("사설 여부"),
                                fieldWithPath("elements[].operationTime").type(JsonFieldType.STRING).description("운영 시간").optional(),
                                fieldWithPath("elements[].private_reason").type(JsonFieldType.STRING).description("사설 사유").optional(),
                                fieldWithPath("elements[].stationState").type(JsonFieldType.STRING).description("충전소 상태").optional(),
                                fieldWithPath("elements[].address").type(JsonFieldType.STRING).description("주소").optional(),
                                fieldWithPath("elements[].latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("elements[].longitude").type(JsonFieldType.NUMBER).description("경도")
                        )
                ));
    }

    @Test
    void 충전소_정보를_상세_조회한다() throws Exception {
        // given
        given(adminService.getStation(any(), any()))
                .willReturn(선릉역_충전소_충전기_2개_사용가능_1개);

        // when && then
        mockMvc.perform(get("/admin/stations/{stationId}", "station123")
                        .header(HttpHeaders.AUTHORIZATION, "token~~"))
                .andExpect(status().isOk())
                .andDo(customDocument("get-station",
                        pathParameters(parameterWithName("stationId").description("충전소 ID")),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("companyName").type(JsonFieldType.STRING).description("회사 이름"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("detailLocation").type(JsonFieldType.STRING).description("상세 위치").optional(),
                                fieldWithPath("isParkingFree").type(JsonFieldType.BOOLEAN).description("주차 여부"),
                                fieldWithPath("isPrivate").type(JsonFieldType.BOOLEAN).description("사설 여부"),
                                fieldWithPath("operationTime").type(JsonFieldType.STRING).description("운영 시간").optional(),
                                fieldWithPath("private_reason").type(JsonFieldType.STRING).description("사설 사유").optional(),
                                fieldWithPath("stationState").type(JsonFieldType.STRING).description("충전소 상태").optional(),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("주소").optional(),
                                fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("경도"),
                                subsectionWithPath("chargers").description("충전기 목록").optional()
                                        .type(JsonFieldType.ARRAY)
                                        .optional()
                                        .description("충전기 목록").optional(),
                                subsectionWithPath("chargers[].chargerId").type(JsonFieldType.STRING).description("충전기 ID"),
                                subsectionWithPath("chargers[].type").type(JsonFieldType.STRING).description("충전기 타입"),
                                subsectionWithPath("chargers[].capacity").type(JsonFieldType.NUMBER).description("용량"),
                                subsectionWithPath("chargers[].price").type(JsonFieldType.NUMBER).description("가격"),
                                subsectionWithPath("chargers[].method").type(JsonFieldType.STRING).description("충전 방식").optional()
                        )
                ));
    }
}
