package com.carffeine.carffeine.admin.controller;

import com.carffeine.carffeine.helper.MockBeanInjection;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.carffeine.carffeine.helper.RestDocsHelper.customDocument;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@WebMvcTest(AdminController.class)
@AutoConfigureRestDocs
public class AdminControllerTest extends MockBeanInjection {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void 충전소를_페이지_단위로_조회한다() throws Exception {
        //given
        given(adminService.getStations(any(), any(), any()))
                .willReturn(new PageImpl<>(List.of(선릉역_충전소_충전기_2개_사용가능_1개, 잠실역_충전소_충전기_2개_사용가능_1개), Pageable.ofSize(1), 2));

        mockMvc.perform(get("/admin/stations")
                        .param("page", "0")
                        .param("size", "1")
                        .param("q", "선릉역 충전소")
                        .header(HttpHeaders.AUTHORIZATION, "token~~")
                )
                .andExpect(status().isOk())
                .andDo(customDocument("get-stations",
                        requestParameters(
                                parameterWithName("q").description("검색어"),
                                parameterWithName("size").description("한 페이지에 받을 사이즈"),
                                parameterWithName("page").description("몇번째 페이지")
                        ),
                        requestHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("인증 토큰")
                        ),
                        responseFields(
                                fieldWithPath("lastPage").description("마지막 페이지"),
                                subsectionWithPath("elements").description("정보들")
                        )
                ));
    }
}
