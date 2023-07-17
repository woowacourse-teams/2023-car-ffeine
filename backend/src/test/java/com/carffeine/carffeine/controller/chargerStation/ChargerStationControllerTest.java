package com.carffeine.carffeine.controller.chargerStation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationException;
import com.carffeine.carffeine.domain.chargestation.exception.ChargeStationExceptionType;
import com.carffeine.carffeine.service.chargerstation.ChargerStationService;
import com.carffeine.carffeine.service.chargerstation.dto.CoordinateRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.fixture.chargerstation.ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(ReplaceUnderscores.class)
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

        // when
        List<ChargeStation> fakeChargeStations = List.of(선릉역_충전소_충전기_2개_사용가능_1개);
        when(chargerStationService.findByCoordinate(coordinateRequest)).thenReturn(fakeChargeStations);

        // then
        mockMvc.perform(get("/api/stations")
                        .param("latitude", latitude.toString())
                        .param("longitude", longitude.toString())
                        .param("latitudeDelta", latitudeDelta.toString())
                        .param("longitudeDelta", longitudeDelta.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stations", hasSize(1)))
                .andDo(customDocument("findChargeStation",
                        requestParameters(
                                parameterWithName("latitude").description("기준 위도"),
                                parameterWithName("longitude").description("기준 경도"),
                                parameterWithName("latitudeDelta").description("변화 위도"),
                                parameterWithName("longitudeDelta").description("변화 경도")
                        ),
                        responseFields(
                                fieldWithPath("stations").type(JsonFieldType.ARRAY).description("충전소들"),
                                fieldWithPath("stations[].stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stations[].stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("stations[].companyName").type(JsonFieldType.STRING).description("충전소 회사 이름"),
                                fieldWithPath("stations[].chargers").type(JsonFieldType.ARRAY).description("충전소의 충전기들"),
                                fieldWithPath("stations[].chargers[].type").type(JsonFieldType.STRING).description("충전기 종류"),
                                fieldWithPath("stations[].chargers[].capacity").type(JsonFieldType.NUMBER).description("충전기 용량"),
                                fieldWithPath("stations[].chargers[].address").type(JsonFieldType.STRING).description("충전기 위치"),
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

    @Test
    void 충전소_id_값으로_충전소를_조회한다() throws Exception {
        // given
        ChargeStation chargeStation = 선릉역_충전소_충전기_2개_사용가능_1개;
        String stationId = chargeStation.getStationId();

        // when
        when(chargerStationService.findStationById(stationId)).thenReturn(chargeStation);

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/stations/" + stationId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chargers", hasSize(2)))
                .andDo(customDocument("findChargeStationById",
                        responseFields(
                                fieldWithPath("stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("companyName").type(JsonFieldType.STRING).description("충전소 회사 이름"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("담당 연락처"),
                                fieldWithPath("chargers").type(JsonFieldType.ARRAY).description("충전소의 충전기들"),
                                fieldWithPath("chargers[].type").type(JsonFieldType.STRING).description("충전기 종류"),
                                fieldWithPath("chargers[].price").type(JsonFieldType.NUMBER).description("충전기 kWh당 가격"),
                                fieldWithPath("chargers[].capacity").type(JsonFieldType.NUMBER).description("충전기 용량"),
                                fieldWithPath("chargers[].latestUpdateTime").type(JsonFieldType.STRING).description("마지막 충전기 사용유무 업데이트 시간"),
                                fieldWithPath("chargers[].state").type(JsonFieldType.BOOLEAN).description("충전기 사용 유무"),
                                fieldWithPath("chargers[].method").type(JsonFieldType.STRING).description("충전 여부 (단독 / 동시)"),
                                fieldWithPath("chargers[].address").type(JsonFieldType.STRING).description("충전기 위치"),
                                fieldWithPath("isParkingFree").type(JsonFieldType.BOOLEAN).description("주차 무료 여부"),
                                fieldWithPath("operatingTime").type(JsonFieldType.STRING).description("이용 가능 시간"),
                                fieldWithPath("detailLocation").type(JsonFieldType.STRING).description("상세 위치"),
                                fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("isPrivate").type(JsonFieldType.BOOLEAN).description("이용 제한"),
                                fieldWithPath("stationState").type(JsonFieldType.STRING).description("충전소 이용 안내사항"),
                                fieldWithPath("privateReason").type(JsonFieldType.STRING).description("이용 제한 사유")
                        )
                ));
    }

    @Test
    void 충전소_id가_존재하지_않다면_NOT_FOUND_예외가_발생한다() throws Exception {
        // when
        when(chargerStationService.findStationById("errorId")).thenThrow(new ChargeStationException(ChargeStationExceptionType.NOT_FOUND_ID));

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/stations/" + "errorId"))
                .andExpect(status().isNotFound())
                .andDo(customDocument("findChargeStationByInvalidId",
                        responseFields(
                                fieldWithPath("exceptionCode").type(JsonFieldType.NUMBER).description("커스텀 예외 코드"),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("예외 메시지")
                        )
                ));
    }
}
