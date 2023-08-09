package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.MisinformationReportResponse;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

public class AdminReportIntegrationTestFixture {

    public static ExtractableResponse<Response> 토큰과_함께_페이지_번호와_사이즈로_충전소_제보_정보를_요청한다(String 토큰, int 페이지_번호, int 페이지_사이즈) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .param("page", 페이지_번호)
                .param("size", 페이지_사이즈)
                .get("/admin/misinformation-reports")
                .then().log().all()
                .extract();
    }

    public static void 충전소_제보_정보_페이지를_검증한다(ExtractableResponse<Response> extract, int 페이지_사이즈, MisinformationReport... 충전소_제보들) {
        CustomPage<MisinformationReportResponse> response = extract.as(new TypeRef<>() {
        });
        List<MisinformationReportResponse> result = Arrays.stream(충전소_제보들)
                .map(MisinformationReportResponse::from)
                .toList();
        assertSoftly(softly -> {
            softly.assertThat(response.elements()).usingRecursiveComparison()
                    .isEqualTo(result);
            softly.assertThat(response.lastPage()).isEqualTo(페이지_사이즈);
        });
    }
}
