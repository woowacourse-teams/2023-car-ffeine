package com.carffeine.carffeine.car.controller;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.infrastructure.dto.CarResponse;
import com.carffeine.carffeine.car.infrastructure.dto.CarsResponse;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.helper.MockBeanInjection;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHeaders;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.carffeine.carffeine.car.fixture.CarFixture.createCar;
import static com.carffeine.carffeine.car.fixture.CarFixture.createOtherCar;
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createCapacityFilter;
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createCompanyFilter;
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createConnectorTypeFilter;
import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
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
@AutoConfigureRestDocs
@WebMvcTest(CarController.class)
class CarControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 모든_차량_정보를_조회한다() throws Exception {
        // given
        CarsResponse carsResponse = new CarsResponse(
                List.of(
                        new CarResponse(1L, "아이오닉5", "2022-A"),
                        new CarResponse(2L, "아이오닉5", "2022-B")
                )
        );

        // when
        when(carQueryService.findAllCars()).thenReturn(carsResponse);

        // then
        mockMvc.perform(get("/cars"))
                .andExpect(status().isOk())
                .andDo(customDocument("find_all_cars",
                        responseFields(
                                fieldWithPath("cars[0].carId").type(JsonFieldType.NUMBER).description("차량의 id"),
                                fieldWithPath("cars[0].name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("cars[0].vintage").type(JsonFieldType.STRING).description("차량 연식"),
                                fieldWithPath("cars[1].carId").type(JsonFieldType.NUMBER).description("차량의 id"),
                                fieldWithPath("cars[1].name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("cars[1].vintage").type(JsonFieldType.STRING).description("차량 연식")
                        )
                ));
    }

    @Test
    void 차량을_저장한다() throws Exception {
        // given
        CarsRequest request = new CarsRequest(
                List.of(
                        new CarRequest("아이오닉5", "2022-A"),
                        new CarRequest("아이오닉5", "2022-A")
                )
        );

        List<Car> cars = List.of(createCar(), createOtherCar());

        // when
        when(carService.saveCars(any(), eq(request))).thenReturn(cars);

        // then
        mockMvc.perform(post("/cars")
                        .header(AUTHORIZATION, "Bearer token~~")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isCreated())
                .andDo(customDocument("save_all_cars",
                        requestHeaders(headerWithName(AUTHORIZATION).description("인증 토큰")),
                        requestFields(
                                fieldWithPath("cars[0].name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("cars[0].vintage").type(JsonFieldType.STRING).description("차량 연식"),
                                fieldWithPath("cars[1].name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("cars[1].vintage").type(JsonFieldType.STRING).description("차량 연식")
                        ),
                        responseFields(
                                fieldWithPath("cars[0].carId").type(JsonFieldType.NUMBER).description("차량의 id"),
                                fieldWithPath("cars[0].name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("cars[0].vintage").type(JsonFieldType.STRING).description("차량 연식"),
                                fieldWithPath("cars[1].carId").type(JsonFieldType.NUMBER).description("차량의 id"),
                                fieldWithPath("cars[1].name").type(JsonFieldType.STRING).description("차량 이름"),
                                fieldWithPath("cars[1].vintage").type(JsonFieldType.STRING).description("차량 연식")
                        )
                ));
    }

    @Test
    void 차량을_제거한다() throws Exception {
        // when
        doNothing().when(carService).deleteCar(1L, 2L);

        // then
        mockMvc.perform(delete("/cars/{carId}", 1L)
                        .header(AUTHORIZATION, "Bearer token~~")
                ).andExpect(status().isNoContent())
                .andDo(customDocument("delete_car",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        pathParameters(parameterWithName("carId").description("차량 id"))
                ));
    }

    @Test
    void 차량_필터를_모두_조회한다() throws Exception {
        // given
        List<Filter> filters = List.of(
                createCompanyFilter(),
                createConnectorTypeFilter(),
                createCapacityFilter()
        );
        FiltersResponse response = FiltersResponse.from(filters);

        // when
        when(filterQueryService.findCarFilters(anyLong())).thenReturn(response);

        // then
        mockMvc.perform(get("/cars/{carId}/filters", 1L))
                .andExpect(status().isOk())
                .andDo(customDocument("find_car_filters",
                        pathParameters(parameterWithName("carId").description("차량 id")),
                        responseFields(
                                fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                        )
                ));
    }

    @Test
    void 차량_필터를_저장한다() throws Exception {
        // given
        List<Filter> filters = List.of(
                createCompanyFilter(),
                createConnectorTypeFilter(),
                createCapacityFilter()
        );

        FiltersRequest request = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "HG"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        // when
        when(carService.addCarFilters(anyLong(), anyLong(), any())).thenReturn(filters);

        // then
        mockMvc.perform(post("/cars/{carId}/filters", 1L)
                        .header(AUTHORIZATION, "Bearer token~~")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isCreated())
                .andDo(customDocument("add_car_filters",
                        requestHeaders(headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")),
                        pathParameters(parameterWithName("carId").description("차량 id")),
                        requestFields(
                                fieldWithPath("filters[0].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[0].name").type(JsonFieldType.STRING).description("필터 이름"),
                                fieldWithPath("filters[1].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[1].name").type(JsonFieldType.STRING).description("필터 이름"),
                                fieldWithPath("filters[2].type").type(JsonFieldType.STRING).description("필터 종류"),
                                fieldWithPath("filters[2].name").type(JsonFieldType.STRING).description("필터 이름")
                        ),
                        responseFields(
                                fieldWithPath("companies[0]").type(JsonFieldType.ARRAY).description("충전기 회사"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("충전 용량"),
                                fieldWithPath("connectorTypes[0]").type(JsonFieldType.ARRAY).description("충전기 타입")
                        )
                ));
    }
}
