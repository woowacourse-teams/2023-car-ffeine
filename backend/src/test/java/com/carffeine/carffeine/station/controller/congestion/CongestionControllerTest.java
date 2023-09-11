package com.carffeine.carffeine.station.controller.congestion;

import com.carffeine.carffeine.helper.MockBeanInjection;
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

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
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

        given(congestionService.showCongestionStatistics(any(), anyString()))
                .willReturn(
                        new StatisticsResponse("1", new CongestionResponse(
                                getCongestions(),
                                getCongestions()
                        ))
                );

        mockMvc.perform(get("/stations/{stationId}/statistics", stationId)
                        .param("dayOfWeek", "monday")
                ).andExpect(status().isOk())
                .andExpect(jsonPath("$.stationId").value("1"))
                .andDo(customDocument("statistics",
                        pathParameters(
                                parameterWithName("stationId").description("충전소 ID")
                        ),
                        requestParameters(
                                parameterWithName("dayOfWeek").description("요일 (monday ~ sunday)")
                        ),
                        responseFields(
                                fieldWithPath("stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("congestion").type(JsonFieldType.OBJECT).description("혼잡도 정보"),
                                fieldWithPath("congestion.standard").type(JsonFieldType.ARRAY).description("표준 충전기 혼잡도 정보"),
                                fieldWithPath("congestion.standard[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.standard[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.standard[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick").type(JsonFieldType.ARRAY).description("고속 충전기 혼잡도 정보"),
                                fieldWithPath("congestion.quick[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick[].ratio").type(JsonFieldType.NUMBER).description("혼잡도"),
                                fieldWithPath("congestion.quick[].hour").type(JsonFieldType.NUMBER).description("시간"),
                                fieldWithPath("congestion.quick[].ratio").type(JsonFieldType.NUMBER).description("혼잡도")
                        )));
    }

    private List<CongestionInfoResponse> getCongestions() {
        List<CongestionInfoResponse> congestions = new ArrayList<>();

        for (int i = 0; i < 24; i++) {
            congestions.add(new CongestionInfoResponse(i, -1));
        }

        return congestions;
    }
}
