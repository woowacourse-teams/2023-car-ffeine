package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.admin.common.CustomPage;
import com.carffeine.carffeine.admin.controller.dto.MembersResponse;
import com.carffeine.carffeine.admin.service.dto.MemberRoleUpdateRequest;
import com.carffeine.carffeine.member.domain.Member;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

public class AdminMemberIntegrationTestFixture {

    public static void 회원_정보_페이지를_검증한다(ExtractableResponse<Response> extract, int 페이지_사이즈, Member... 회원들) {
        CustomPage<MembersResponse> response = extract.as(new TypeRef<>() {
        });
        List<MembersResponse> result = Arrays.stream(회원들)
                .map(MembersResponse::from)
                .toList();
        assertSoftly(softly -> {
            softly.assertThat(response.elements()).usingRecursiveComparison()
                    .isEqualTo(result);
            softly.assertThat(response.lastPage()).isEqualTo(페이지_사이즈);
        });
    }

    public static ExtractableResponse<Response> 토큰과_함께_페이지_번호와_사이즈로_회원_정보를_요청한다(String 토큰, int 페이지_번호, int 페이지_사이즈) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .param("page", 페이지_번호)
                .param("size", 페이지_사이즈)
                .get("/admin/members")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 토큰과_함께_회원의_권한을_변경한다(String 토큰, Member 회원, MemberRoleUpdateRequest 수정_요청) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, 토큰)
                .contentType("application/json")
                .body(수정_요청)
                .patch("/admin/members/{stationId}", 회원.getId())
                .then().log().all()
                .extract();
    }
}
