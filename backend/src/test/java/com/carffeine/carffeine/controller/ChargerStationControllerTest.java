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
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
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
        BigDecimal centerX = BigDecimal.valueOf(40.3994933);
        BigDecimal centerY = BigDecimal.valueOf(129.3994933);
        BigDecimal deltaX = BigDecimal.valueOf(1);
        BigDecimal deltaY = BigDecimal.valueOf(1);
        CoordinateRequest coordinateRequest = new CoordinateRequest(centerX, centerY, deltaX, deltaY);
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
                .andDo(customDocument("findChargeStation"));
    }
}
