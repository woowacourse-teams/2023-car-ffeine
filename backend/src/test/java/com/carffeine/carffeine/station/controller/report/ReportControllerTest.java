package com.carffeine.carffeine.station.controller.report;

import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.fixture.MemberFixture;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.service.report.dto.MisinformationReportRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(ReportController.class)
@AutoConfigureRestDocs
class ReportControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 충전소를_신고한다() throws Exception {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        Member member = MemberFixture.일반_회원;
        long memberId = 12L;

        // when
        FaultReport faultReport = FaultReport.builder()
                .station(station)
                .id(1L)
                .member(member)
                .build();

        when(reportService.saveFaultReport(station.getStationId(), memberId)).thenReturn(faultReport);

        // then
        mockMvc.perform(post("/stations/{stationId}/reports", station.getStationId())
                        .header(HttpHeaders.AUTHORIZATION, memberId))

                .andExpect(status().isNoContent())
                .andDo(customDocument("save-report",
                        requestHeaders(headerWithName("Authorization").description("회원 id.")),
                        pathParameters(parameterWithName("stationId").description("충전소 id")))
                );
    }

    @Test
    void 충전소의_잘못된_정보를_신고한다() throws Exception {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        long memberId = 12L;
        MisinformationReportRequest.StationDetailToUpdate detail = new MisinformationReportRequest.StationDetailToUpdate("address", "부산");
        MisinformationReportRequest request = new MisinformationReportRequest(List.of(detail));

        // when
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .member(Member.builder()
                        .id(memberId)
                        .build())
                .station(station)
                .misinformationDetailReports(request.toDetailReports())
                .build();
        when(reportService.saveMisinformationReport(station.getStationId(), memberId, request)).thenReturn(misinformationReport);

        // then
        mockMvc.perform(post("/stations/{stationId}/misinformation-reports", station.getStationId())
                        .header(HttpHeaders.AUTHORIZATION, memberId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isNoContent())
                .andDo(customDocument("save-misinformation-report",
                                requestHeaders(headerWithName("Authorization").description("회원 id")),
                                pathParameters(parameterWithName("stationId").description("충전소 id")),
                                requestFields(
                                        fieldWithPath("stationDetailsToUpdate").type(JsonFieldType.ARRAY).description("잘못된 정보들"),
                                        fieldWithPath("stationDetailsToUpdate[].category").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("stationDetailsToUpdate[].reportedDetail").type(JsonFieldType.STRING).description("상세정보")
                                )
                        )
                );
    }

    @Test
    void 충전소를_이미_신고했는지_확인한다() throws Exception {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        long memberId = 12L;

        // when
        when(reportService.isDuplicateReportStation(memberId, station.getStationId())).thenReturn(false);

        // then
        mockMvc.perform(get("/stations/{stationId}/reports/me", station.getStationId())
                        .header(HttpHeaders.AUTHORIZATION, memberId))

                .andExpect(status().isOk())
                .andDo(customDocument("duplicate-report",
                                requestHeaders(headerWithName("Authorization").description("회원 id.")),
                                pathParameters(parameterWithName("stationId").description("충전소 id")),
                                responseFields(fieldWithPath("isReported").type(JsonFieldType.BOOLEAN).description("신고 여부"))
                        )
                );

    }
}
