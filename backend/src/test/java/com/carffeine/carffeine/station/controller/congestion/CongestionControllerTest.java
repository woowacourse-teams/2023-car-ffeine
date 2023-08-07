package com.carffeine.carffeine.station.controller.congestion;

import com.carffeine.carffeine.station.MockBeanInjection;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionInfoResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.CongestionResponse;
import com.carffeine.carffeine.station.controller.congestion.dto.StatisticsResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(CongestionController.class)
@AutoConfigureRestDocs
class CongestionControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 혼잡도를_계산하여_반환한다() throws Exception {
        // given
        String stationId = "1";

        given(congestionService.calculateCongestion(any()))
                .willReturn(
                        new StatisticsResponse(
                                "1",
                                getExpected())
                );

        mockMvc.perform(get("/stations/{stationId}/statistics", stationId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stationId").value("1"))
                .andDo(customDocument("statistics",
                        pathParameters(
                                parameterWithName("stationId").description("충전소 ID")
                        ),
                        responseFields(
                                fieldWithPath("stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("congestion").type(JsonFieldType.OBJECT).description("혼잡도 정보"),
                                fieldWithPath("congestion.standard").type(JsonFieldType.OBJECT).description("표준 충전기 혼잡도 정보"),
                                fieldWithPath("congestion.standard.MON").type(JsonFieldType.ARRAY).description("월요일 혼잡도 정보"),
                                fieldWithPath("congestion.standard.MON[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard.MON[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard.TUE").type(JsonFieldType.ARRAY).description("화요일 혼잡도 정보"),
                                fieldWithPath("congestion.standard.TUE[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard.TUE[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard.WED").type(JsonFieldType.ARRAY).description("수요일 혼잡도 정보"),
                                fieldWithPath("congestion.standard.WED[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard.WED[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard.THU").type(JsonFieldType.ARRAY).description("목요일 혼잡도 정보"),
                                fieldWithPath("congestion.standard.THU[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard.THU[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard.FRI").type(JsonFieldType.ARRAY).description("금요일 혼잡도 정보"),
                                fieldWithPath("congestion.standard.FRI[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard.FRI[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard.SAT").type(JsonFieldType.ARRAY).description("토요일 혼잡도 정보"),
                                fieldWithPath("congestion.standard.SAT[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard.SAT[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard.SUN").type(JsonFieldType.ARRAY).description("일요일 혼잡도 정보"),
                                fieldWithPath("congestion.standard.SUN[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard.SUN[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick").type(JsonFieldType.OBJECT).description("급속 충전기 혼잡도 정보"),
                                fieldWithPath("congestion.quick.MON").type(JsonFieldType.ARRAY).description("월요일 혼잡도 정보"),
                                fieldWithPath("congestion.quick.MON[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick.MON[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick.TUE").type(JsonFieldType.ARRAY).description("화요일 혼잡도 정보"),
                                fieldWithPath("congestion.quick.TUE[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick.TUE[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick.WED").type(JsonFieldType.ARRAY).description("수요일 혼잡도 정보"),
                                fieldWithPath("congestion.quick.WED[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick.WED[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick.THU").type(JsonFieldType.ARRAY).description("목요일 혼잡도 정보"),
                                fieldWithPath("congestion.quick.THU[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick.THU[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick.FRI").type(JsonFieldType.ARRAY).description("금요일 혼잡도 정보"),
                                fieldWithPath("congestion.quick.FRI[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick.FRI[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick.SAT").type(JsonFieldType.ARRAY).description("토요일 혼잡도 정보"),
                                fieldWithPath("congestion.quick.SAT[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick.SAT[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick.SUN").type(JsonFieldType.ARRAY).description("일요일 혼잡도 정보"),
                                fieldWithPath("congestion.quick.SUN[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick.SUN[].ratio").type(JsonFieldType.NUMBER).description("혼잡도")
                        )));
    }

    private CongestionResponse getExpected() {
        List<CongestionInfoResponse> dailyCongestion = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            dailyCongestion.add(new CongestionInfoResponse(i, -1));
        }
        return new CongestionResponse(
                Map.of("MON", dailyCongestion,
                        "TUE", dailyCongestion,
                        "WED", dailyCongestion,
                        "THU", dailyCongestion,
                        "FRI", dailyCongestion,
                        "SAT", dailyCongestion,
                        "SUN", dailyCongestion),
                Map.of("MON", dailyCongestion,
                        "TUE", dailyCongestion,
                        "WED", dailyCongestion,
                        "THU", dailyCongestion,
                        "FRI", dailyCongestion,
                        "SAT", dailyCongestion,
                        "SUN", dailyCongestion)
        );
    }
}
