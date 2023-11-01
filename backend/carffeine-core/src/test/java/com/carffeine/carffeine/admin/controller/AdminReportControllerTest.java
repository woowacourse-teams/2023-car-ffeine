package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.member.fixture.MemberFixture;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
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
import static com.carffeine.carffeine.station.fixture.report.MisinformationReportFixture.선릉역_상세정보가_포함된_잘못된_정보_제보;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(AdminReportController.class)
@AutoConfigureRestDocs
public class AdminReportControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 충전소_정보_제보를_페이지_단위로_조회한다() throws Exception {
        // given
        given(adminReportService.getMisinformationReports(any(), any()))
                .willReturn(new PageImpl<>(List.of(선릉역_상세정보가_포함된_잘못된_정보_제보), Pageable.ofSize(2), 2));

        // when & then
        mockMvc.perform(get("/admin/misinformation-reports")
                        .param("page", "0")
                        .param("size", "2")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~"))
                .andExpect(status().isOk())
                .andDo(customDocument("get-misinformation-reports",
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기")
                        ),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("lastPage").description("전체 페이지 수"),
                                subsectionWithPath("elements").description("리스트의 요소들")
                                        .type(JsonFieldType.ARRAY),
                                subsectionWithPath("elements[].id").description("리포트 ID"),
                                subsectionWithPath("elements[].memberId").description("제보한 회원 ID"),
                                subsectionWithPath("elements[].isChecked").description("확인 여부")
                        )
                ));
    }

    @Test
    void 충전소_정보_제보_상세_조회한다() throws Exception {
        // given
        given(adminReportService.getMisinformationDetail(any(), any()))
                .willReturn(선릉역_상세정보가_포함된_잘못된_정보_제보);

        // when & then
        mockMvc.perform(get("/admin/misinformation-reports/{misinformationId}", 123L)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~"))
                .andExpect(status().isOk())
                .andDo(customDocument("get-misinformation-detail",
                        pathParameters(parameterWithName("misinformationId").description("제보 ID")),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("id").description("리포트 ID"),
                                fieldWithPath("stationId").description("충전소 ID"),
                                fieldWithPath("memberId").description("멤버 ID"),
                                fieldWithPath("isChecked").description("체크 여부"),
                                subsectionWithPath("details").description("상세 정보 목록")
                                        .type(JsonFieldType.ARRAY),
                                subsectionWithPath("details[].detailId").description("상세 정보 ID"),
                                subsectionWithPath("details[].category").description("카테고리"),
                                subsectionWithPath("details[].content").description("내용")
                        )
                ));
    }

    @Test
    void 충전소_제보_확인으로_변경한다() throws Exception {
        mockMvc.perform(patch("/admin/misinformation-reports/{misinformationId}", 123L)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~"))
                .andExpect(status().isNoContent())
                .andDo(customDocument("update-misinformation-checked",
                        pathParameters(parameterWithName("misinformationId").description("미스인포메이션 리포트 ID")),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰"))
                ));
    }

    @Test
    void 충전소_고장_신고를_페이지_단위로_조회한다() throws Exception {
        // given
        FaultReport fault = FaultReport.builder().id(1L)
                .member(MemberFixture.일반_회원)
                .station(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속)
                .build();
        given(adminReportService.getFaultReports(any(), any()))
                .willReturn(new PageImpl<>(List.of(fault), Pageable.ofSize(2), 2));

        // when & then
        mockMvc.perform(get("/admin/fault-reports")
                        .param("page", "0")
                        .param("size", "2")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer token~~"))
                .andExpect(status().isOk())
                .andDo(customDocument("get-fault-reports",
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기")
                        ),
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        responseFields(
                                fieldWithPath("lastPage").description("전체 페이지 수"),
                                subsectionWithPath("elements").description("리스트의 요소들")
                                        .type(JsonFieldType.ARRAY),
                                subsectionWithPath("elements[].id").description("리포트 ID"),
                                subsectionWithPath("elements[].memberId").description("신고한 회원 ID"),
                                subsectionWithPath("elements[].stationId").description("신고당한 충전소 ID")
                        )
                ));
    }
}
