package com.carffeine.carffeine.filter.controller;

import com.carffeine.carffeine.filter.controller.dto.capacity.CapacitiesRequest;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameRequest;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNamesRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypesRequest;
import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.helper.MockBeanInjection;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@AutoConfigureRestDocs
@WebMvcTest(FilterController.class)
class FilterControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 현재_존재하는_모든_필터를_반환한다() throws Exception {
        // given
        FiltersResponse filtersResponse = FiltersResponse.of(
                List.of(CompanyName.from("HG", "환경부")),
                List.of(Capacity.from(BigDecimal.valueOf(2))),
                List.of(ConnectorType.from("DC_COMBO", "고속"))
        );

        // when
        when(filterService.findAllFilters()).thenReturn(filtersResponse);

        // then
        mockMvc.perform(get("/filters"))
                .andExpect(status().isOk())
                .andDo(customDocument("find_all_filters",
                        responseFields(
                                fieldWithPath("companyNames[0].key").type(JsonFieldType.STRING).description("필터에 적용된 회사명 키"),
                                fieldWithPath("companyNames[0].value").type(JsonFieldType.STRING).description("필터에 적용된 회사 이름"),
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("필터에 적용된 충전기 용량"),
                                fieldWithPath("connectorTypes[0].key").type(JsonFieldType.STRING).description("필터에 적용된 커넥터 이름 키"),
                                fieldWithPath("connectorTypes[0].value").type(JsonFieldType.STRING).description("필터에 적용된 사용자용 커넥터의 이름")
                        )
                ));
    }

    @Test
    void 회사_이름을_필터에_추가한다() throws Exception {
        // given
        CompanyNamesRequest companyNamesRequest = new CompanyNamesRequest(
                List.of(new CompanyNameRequest("HG", "환경부"))
        );

        // when & then
        mockMvc.perform(post("/filters/company-names")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(companyNamesRequest))
                ).andExpect(status().isNoContent())
                .andDo(customDocument("add_company_names_on_filter",
                        requestFields(
                                fieldWithPath("companyNames[0].key").type(JsonFieldType.STRING).description("필터에 적용할 회사 이름 키"),
                                fieldWithPath("companyNames[0].value").type(JsonFieldType.STRING).description("필터에 적용할 회사 이름")
                        )
                ));
    }

    @Test
    void 충전_타입을_필터에_추가한다() throws Exception {
        // given
        ConnectorTypesRequest connectorTypesRequest = new ConnectorTypesRequest(
                List.of(new ConnectorTypeRequest("DC_COMBO", "DC 차데모"))
        );

        // when & then
        mockMvc.perform(post("/filters/connector-types")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(connectorTypesRequest))
                ).andExpect(status().isNoContent())
                .andDo(customDocument("add_type_on_filter",
                        requestFields(
                                fieldWithPath("connectTypes[0].key").type(JsonFieldType.STRING).description("필터에 적용할 커넥터 이름 축약"),
                                fieldWithPath("connectTypes[0].value").type(JsonFieldType.STRING).description("필터에 적용된 사용자용 커넥터의 이름")
                        )
                ));
    }

    @Test
    void 충전기_용량을_필터에_추가한다() throws Exception {
        // given
        CapacitiesRequest capacitiesRequest = new CapacitiesRequest(
                List.of(new BigDecimal("2.00"))
        );

        // when & then
        mockMvc.perform(post("/filters/capacities")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(capacitiesRequest))
                ).andExpect(status().isNoContent())
                .andDo(customDocument("add_capacities_on_filter",
                        requestFields(
                                fieldWithPath("capacities[0]").type(JsonFieldType.ARRAY).description("필터에 적용할 충전기 속도")
                        )
                ));
    }
}
