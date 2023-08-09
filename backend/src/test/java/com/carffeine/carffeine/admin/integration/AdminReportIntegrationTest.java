package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.admin.controller.dto.MisinformationDetailResponse;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.report.MisinformationDetailReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReportRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;

import static com.carffeine.carffeine.admin.integration.AdminReportIntegrationTestFixture.충전소_제보_정보_페이지를_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminReportIntegrationTestFixture.토큰과_함께_페이지_번호와_사이즈로_충전소_제보_정보를_요청한다;
import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.상태_코드를_검증한다;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AdminReportIntegrationTest extends IntegrationTest {

    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MisinformationReportRepository misinformationReportRepository;
    @Autowired
    private TokenProvider provider;

    private Station 선릉_충전소;
    private Station 잠실_충전소;
    private Member 관리자;
    private Member 일반_회원;
    private String 관리자_토큰;
    private String 일반_회원_토큰;
    private MisinformationReport 상세한_충전소_제보;
    private MisinformationReport 간단한_충전소_제보;

    @BeforeEach
    void setUp() {
        선릉_충전소 = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        잠실_충전소 = stationRepository.save(잠실역_충전소_충전기_2개_사용가능_1개);

        관리자 = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());
        관리자_토큰 = "Bearer " + provider.create(관리자.getId());

        일반_회원 = memberRepository.save(Member.builder()
                .memberRole(MemberRole.USER)
                .build());
        일반_회원_토큰 = "Bearer " + provider.create(일반_회원.getId());
        상세한_충전소_제보 = MisinformationReport.builder()
                .station(선릉_충전소)
                .member(일반_회원)
                .misinformationDetailReports(List.of(
                        MisinformationDetailReport.builder()
                                .category("address")
                                .content("우리집이 아니에요")
                                .build()
                ))
                .build();
        간단한_충전소_제보 = MisinformationReport.builder()
                .station(선릉_충전소)
                .member(일반_회원)
                .build();
    }

    @Nested
    class 충전소_잘못된_정보_조회할_때 {

        @Test
        void 정상_응답한다() {
            // given
            var 저장한_제보 = misinformationReportRepository.save(상세한_충전소_제보);
            misinformationReportRepository.save(간단한_충전소_제보);

            // when
            var 응답 = 토큰과_함께_페이지_번호와_사이즈로_충전소_제보_정보를_요청한다(관리자_토큰, 2, 1);

            // then
            상태_코드를_검증한다(응답, HttpStatus.OK);
            충전소_제보_정보_페이지를_검증한다(응답, 1, 저장한_제보);
        }

        @Test
        void 관리자가_아니라면_예외가_발생한다() {
            // given & when
            var 응답 = 토큰과_함께_페이지_번호와_사이즈로_충전소_제보_정보를_요청한다(일반_회원_토큰, 0, 1);

            // then
            상태_코드를_검증한다(응답, HttpStatus.FORBIDDEN);
        }
    }

    @Nested
    class 충전서_잘못된_정보를_상세_조회할_때 {
        public static ExtractableResponse<Response> 토큰과_충전소_제보_ID로_충전소_제보_상세_정보를_요청한다(String 토큰, long 제보_ID) {
            return RestAssured.given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, 토큰)
                    .get("/admin/misinformation-reports/{misinformationId}", 제보_ID)
                    .then().log().all()
                    .extract();
        }

        public static void 충전소_제보_상세_정보_응답을_검증한다(ExtractableResponse<Response> 응답, MisinformationReport 제보) {
            var response = 응답.as(MisinformationDetailResponse.class);
            assertThat(response).usingRecursiveComparison()
                    .isEqualTo(MisinformationDetailResponse.from(제보));
        }

        @Test
        void 정상_응답한다() {
            // given
            var 저장한_제보 = misinformationReportRepository.save(상세한_충전소_제보);

            // when
            var 응답 = 토큰과_충전소_제보_ID로_충전소_제보_상세_정보를_요청한다(관리자_토큰, 저장한_제보.getId());

            // then
            상태_코드를_검증한다(응답, HttpStatus.OK);
            충전소_제보_상세_정보_응답을_검증한다(응답, 저장한_제보);
        }
    }
}
