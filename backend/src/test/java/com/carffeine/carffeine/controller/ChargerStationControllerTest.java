package com.carffeine.carffeine.controller;

import com.carffeine.carffeine.domain.ChargeStation;
import com.carffeine.carffeine.dto.CoordinateRequest;
import com.carffeine.carffeine.fixture.ChargeStationFixture;
import com.carffeine.carffeine.service.ChargerStationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(ChargerStationController.class)
@AutoConfigureRestDocs
class ChargerStationControllerTest {

    @MockBean
    private ChargerStationService chargerStationService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 충전소를_위도_경도로_조회한다() throws Exception {
        // given
        BigDecimal latitude = BigDecimal.valueOf(35.3994933);
        BigDecimal longitude = BigDecimal.valueOf(127.3994933);
        BigDecimal latitudeDelta = BigDecimal.valueOf(1);
        BigDecimal longitudeDelta = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(latitude, longitude, latitudeDelta, longitudeDelta);
        String request = objectMapper.writeValueAsString(coordinateRequest);

        // when
        List<ChargeStation> fakeChargeStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        when(chargerStationService.findByCoordinate(coordinateRequest)).thenReturn(fakeChargeStations);

        // then
        mockMvc.perform(get("/api")
                        .content(request)
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stations", hasSize(1)))
                .andDo(customDocument("findChargeStation",
                        requestFields(
                                fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("기준 위도"),
                                fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("기준 경도"),
                                fieldWithPath("latitudeDelta").type(JsonFieldType.NUMBER).description("변화 위도"),
                                fieldWithPath("longitudeDelta").type(JsonFieldType.NUMBER).description("변화 경도")
                        ),
                        responseFields(
                                fieldWithPath("stations").type(JsonFieldType.ARRAY).description("충전소들"),
                                fieldWithPath("stations[].stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stations[].stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("stations[].companyName").type(JsonFieldType.STRING).description("충전소 회사 이름"),
                                fieldWithPath("stations[].chargers").type(JsonFieldType.ARRAY).description("충전소의 충전기들"),
                                fieldWithPath("stations[].chargers[].type").type(JsonFieldType.STRING).description("충전기 종류"),
                                fieldWithPath("stations[].chargers[].capacity").type(JsonFieldType.NUMBER).description("충전기 용량"),
                                fieldWithPath("stations[].chargers[].price").type(JsonFieldType.NUMBER).description("충전기 kWh당 가격"),
                                fieldWithPath("stations[].isParkingFree").type(JsonFieldType.BOOLEAN).description("주차 무료"),
                                fieldWithPath("stations[].operatingTime").type(JsonFieldType.STRING).description("이용 가능 시간"),
                                fieldWithPath("stations[].detailLocation").type(JsonFieldType.STRING).description("상세 위치"),
                                fieldWithPath("stations[].latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("stations[].longitude").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("stations[].isPrivate").type(JsonFieldType.BOOLEAN).description("이용 제한"),
                                fieldWithPath("stations[].totalCount").type(JsonFieldType.NUMBER).description("전체 충전기 수"),
                                fieldWithPath("stations[].availableCount").type(JsonFieldType.NUMBER).description("사용 가능한 수")
                        )
                ));
    }
}
