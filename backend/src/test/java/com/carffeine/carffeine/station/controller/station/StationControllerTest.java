package com.carffeine.carffeine.station.controller.station;

import com.carffeine.carffeine.helper.MockBeanInjection;
import com.carffeine.carffeine.station.domain.charger.ChargerType;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.exception.StationException;
import com.carffeine.carffeine.station.exception.StationExceptionType;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.ChargerSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.RegionMarker;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSimpleResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSpecificResponse;
import com.carffeine.carffeine.station.infrastructure.repository.station.dto.StationSummaryResponse;
import com.carffeine.carffeine.station.service.station.dto.CoordinateRequest;
import com.carffeine.carffeine.station.service.station.dto.StationSearchResponse;
import com.carffeine.carffeine.station.service.station.dto.StationsSearchResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
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
@WebMvcTest(StationController.class)
@AutoConfigureRestDocs
class StationControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 충전소를_위도_경도로_조회한다() throws Exception {
        // given
        BigDecimal latitude = BigDecimal.valueOf(35.3994933);
        BigDecimal longitude = BigDecimal.valueOf(127.3994933);
        BigDecimal latitudeDelta = BigDecimal.valueOf(1);
        BigDecimal longitudeDelta = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(latitude, longitude, latitudeDelta, longitudeDelta);

        // when
        Station station = 선릉역_충전소_충전기_2개_사용가능_1개;
        when(stationQueryService.findByLocation(coordinateRequest, List.of("볼튼"), List.of(ChargerType.DC_COMBO), List.of(new BigDecimal("50.00")))).thenReturn(List.of(new StationSimpleResponse(
                station.getStationId(),
                station.getStationName(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                station.isParkingFree(),
                station.isPrivate(),
                station.getAvailableCount(),
                1L
        )));

        // then
        mockMvc.perform(get("/stations")
                        .param("latitude", latitude.toString())
                        .param("longitude", longitude.toString())
                        .param("latitudeDelta", latitudeDelta.toString())
                        .param("longitudeDelta", longitudeDelta.toString())
                        .param("companyNames", "볼튼")
                        .param("chargerTypes", ChargerType.DC_COMBO.toString())
                        .param("capacities", "50.00")
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stations", hasSize(1)))
                .andDo(customDocument("findChargeStation",
                        requestParameters(
                                parameterWithName("latitude").description("기준 위도"),
                                parameterWithName("longitude").description("기준 경도"),
                                parameterWithName("latitudeDelta").description("변화 위도"),
                                parameterWithName("longitudeDelta").description("변화 경도"),
                                parameterWithName("companyNames").description("필터가 적용된 충전기 회사 이름"),
                                parameterWithName("chargerTypes").description("필터가 적용된 충전기 타입"),
                                parameterWithName("capacities").description("필터가 적용된 충전기 출력")
                        ),
                        responseFields(
                                fieldWithPath("stations").type(JsonFieldType.ARRAY).description("충전소들"),
                                fieldWithPath("stations[].stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stations[].stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("stations[].isParkingFree").type(JsonFieldType.BOOLEAN).description("주차 무료"),
                                fieldWithPath("stations[].latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("stations[].longitude").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("stations[].isPrivate").type(JsonFieldType.BOOLEAN).description("이용 제한"),
                                fieldWithPath("stations[].availableCount").type(JsonFieldType.NUMBER).description("사용 가능한 충전기 수"),
                                fieldWithPath("stations[].quickChargerCount").type(JsonFieldType.NUMBER).description("급속 충전기 수")
                        )
                ));
    }

    @Test
    void 충전소_id_값으로_충전소를_조회한다() throws Exception {
        // given
        Station station = 선릉역_충전소_충전기_2개_사용가능_1개;
        String stationId = station.getStationId();

        // when
        when(stationQueryService.findStationById(stationId)).thenReturn(new StationSpecificResponse(
                station.getStationId(),
                station.getStationName(),
                station.getCompanyName(),
                station.getAddress(),
                station.getContact(),
                station.isParkingFree(),
                station.getOperatingTime(),
                station.getDetailLocation(),
                station.getLatitude().getValue(),
                station.getLongitude().getValue(),
                station.isPrivate(),
                station.getStationState(),
                station.getPrivateReason(),
                station.getReportCount(),
                station.getChargers().stream()
                        .map(it -> new ChargerSpecificResponse(
                                it.getType(),
                                it.getPrice(),
                                it.getCapacity(),
                                it.getChargerStatus().getLatestUpdateTime(),
                                it.getChargerStatus().getChargerCondition(),
                                it.getMethod()
                        )).toList()));

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/stations/" + stationId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chargers", hasSize(2)))
                .andDo(customDocument("findChargeStationById",
                        responseFields(
                                fieldWithPath("stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("companyName").type(JsonFieldType.STRING).description("충전소 회사 이름"),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("충전소 주소"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("담당 연락처"),
                                fieldWithPath("chargers").type(JsonFieldType.ARRAY).description("충전소의 충전기들"),
                                fieldWithPath("chargers[].type").type(JsonFieldType.STRING).description("충전기 종류"),
                                fieldWithPath("chargers[].price").type(JsonFieldType.NUMBER).description("충전기 kWh당 가격"),
                                fieldWithPath("chargers[].capacity").type(JsonFieldType.NUMBER).description("충전기 용량"),
                                fieldWithPath("chargers[].latestUpdateTime").type(JsonFieldType.STRING).description("마지막 충전기 사용유무 업데이트 시간"),
                                fieldWithPath("chargers[].state").type(JsonFieldType.STRING).description("충전기 상태"),
                                fieldWithPath("chargers[].method").type(JsonFieldType.STRING).description("충전 여부 (단독 / 동시)"),
                                fieldWithPath("isParkingFree").type(JsonFieldType.BOOLEAN).description("주차 무료 여부"),
                                fieldWithPath("operatingTime").type(JsonFieldType.STRING).description("이용 가능 시간"),
                                fieldWithPath("detailLocation").type(JsonFieldType.STRING).description("상세 위치"),
                                fieldWithPath("latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("longitude").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("isPrivate").type(JsonFieldType.BOOLEAN).description("이용 제한"),
                                fieldWithPath("stationState").type(JsonFieldType.STRING).description("충전소 이용 안내사항"),
                                fieldWithPath("privateReason").type(JsonFieldType.STRING).description("이용 제한 사유"),
                                fieldWithPath("reportCount").type(JsonFieldType.NUMBER).description("신고 당한 횟수")
                        )
                ));
    }

    @Test
    void 충전소_id가_존재하지_않다면_NOT_FOUND_예외가_발생한다() throws Exception {
        // when
        when(stationQueryService.findStationById("errorId")).thenThrow(new StationException(StationExceptionType.NOT_FOUND_ID));

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/stations/" + "errorId"))
                .andExpect(status().isNotFound())
                .andDo(customDocument("findChargeStationByInvalidId",
                        responseFields(
                                fieldWithPath("exceptionCode").type(JsonFieldType.NUMBER).description("커스텀 예외 코드"),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("예외 메시지")
                        )
                ));
    }

    @Test
    void 충전소를_검색한다() throws Exception {
        when(stationQueryService.searchStations(any(), any(), anyInt(), anyInt()))
                .thenReturn(new StationsSearchResponse(
                        2L,
                        List.of(
                                new StationSearchResponse(
                                        "stationId",
                                        "잠실 충전소",
                                        "address",
                                        BigDecimal.valueOf(37.123456),
                                        BigDecimal.valueOf(127.123456)
                                ),
                                new StationSearchResponse(
                                        "stationId2",
                                        "선릉 충전소",
                                        "address2",
                                        BigDecimal.valueOf(37.123456),
                                        BigDecimal.valueOf(127.123456)
                                )
                        )
                ));

        mockMvc.perform(RestDocumentationRequestBuilders.get("/stations/search?q=선릉&scope=stationId&scope=stationName&scope=address&scope=latitude&scope=longitude&page=1&limit=12"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalCount").value(2))
                .andExpect(jsonPath("$.stations", hasSize(2)))
                .andDo(customDocument("searchStations",
                        requestParameters(
                                parameterWithName("q").description("검색어"),
                                parameterWithName("scope").description("검색 범위"),
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("limit").description("검색 결과 개수")
                        ),
                        responseFields(
                                fieldWithPath("totalCount").type(JsonFieldType.NUMBER).description("검색 결과 전체 개수"),
                                fieldWithPath("stations").type(JsonFieldType.ARRAY).description("검색 결과"),
                                fieldWithPath("stations[].stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stations[].stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("stations[].address").type(JsonFieldType.STRING).description("충전소 주소"),
                                fieldWithPath("stations[].latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("stations[].longitude").type(JsonFieldType.NUMBER).description("경도")
                        )
                ));
    }

    @Test
    void 충전소의_id로_요약정보를_조회한다() throws Exception {
        when(stationQueryService.findStationsSummary(anyList()))
                .thenReturn(List.of(
                        new StationSummaryResponse(
                                "ME101010",
                                "볼튼",
                                "박스터 충전소",
                                "서울시 선릉",
                                "24시간 이용가능",
                                true,
                                false,
                                BigDecimal.valueOf(37.123456),
                                BigDecimal.valueOf(127.123456),
                                2
                        ),
                        new StationSummaryResponse(
                                "ME101011",
                                "볼튼",
                                "카페인 충전소",
                                "서울시 잠실",
                                "24시간 이용가능",
                                true,
                                false,
                                BigDecimal.valueOf(36.123456),
                                BigDecimal.valueOf(127.123456),
                                0
                        )
                ));

        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/stations/summary?stationIds=ME101010,ME101011"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stations", hasSize(2)))
                .andDo(customDocument("stationSummary",
                        requestParameters(
                                parameterWithName("stationIds").description("충전소 ID들")
                        ),
                        responseFields(
                                fieldWithPath("stations").type(JsonFieldType.ARRAY).description("결과"),
                                fieldWithPath("stations[].stationId").type(JsonFieldType.STRING).description("충전소 ID"),
                                fieldWithPath("stations[].stationName").type(JsonFieldType.STRING).description("충전소 이름"),
                                fieldWithPath("stations[].companyName").type(JsonFieldType.STRING).description("충전소 회사 이름"),
                                fieldWithPath("stations[].address").type(JsonFieldType.STRING).description("충전소 주소"),
                                fieldWithPath("stations[].operationTime").type(JsonFieldType.STRING).description("충전소 이용시간"),
                                fieldWithPath("stations[].isParkingFree").type(JsonFieldType.BOOLEAN).description("주차 무료"),
                                fieldWithPath("stations[].isPrivate").type(JsonFieldType.BOOLEAN).description("외부인 개방"),
                                fieldWithPath("stations[].latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("stations[].longitude").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("stations[].quickChargerCount").type(JsonFieldType.NUMBER).description("급속 충전기 개수")
                        )
                ));
    }

    @Test
    void 지역별로_충전소의_개수를_반환한다() throws Exception {
        // when
        when(stationQueryService.findMarkersByRegions(List.of("seoul")))
                .thenReturn(List.of(new RegionMarker("서울시", BigDecimal.valueOf(37.540705), BigDecimal.valueOf(126.956764), 1)));
        // then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/stations/regions").queryParam("regions", "seoul"))
                .andExpect(status().isOk())
                .andDo(customDocument("findMarkerByRegion",
                        requestParameters(
                                parameterWithName("regions").description("지역명")
                        ),
                        responseFields(
                                fieldWithPath("[].regionName").type(JsonFieldType.STRING).description("지역명"),
                                fieldWithPath("[].latitude").type(JsonFieldType.NUMBER).description("위도"),
                                fieldWithPath("[].longitude").type(JsonFieldType.NUMBER).description("경도"),
                                fieldWithPath("[].count").type(JsonFieldType.NUMBER).description("충전소 개수")
                        )
                ));
    }
}
