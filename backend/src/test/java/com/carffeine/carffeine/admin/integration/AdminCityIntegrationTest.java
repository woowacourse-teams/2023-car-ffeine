package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.city.domain.City;
import com.carffeine.carffeine.city.domain.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.도시_정보_페이지를_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.생성된_도시_정보를_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.신천동_정보_생성;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.업데이트_정보_생성;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.업데이트된_도시_정보를_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.제거된_도시_정보를_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.토큰과_함께_도시_정보_업데이트;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.토큰과_함께_도시_정보_저장;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.토큰과_함께_도시_정보를_제거한다;
import static com.carffeine.carffeine.admin.integration.AdminCityIntegrationTestFixture.토큰과_함께_페이지_번호와_사이즈로_도시_정보를_요청한다;
import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_잠실동_정보;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class AdminCityIntegrationTest extends IntegrationTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private TokenProvider provider;

    private City 잠실동;
    private Member 관리자;
    private String 관리자_토큰;

    @BeforeEach
    void setUp() {
        잠실동 = cityRepository.save(서울특별시_송파구_잠실동_정보);

        관리자 = memberRepository.save(Member.builder()
                .name("admin")
                .email("admin@email.com")
                .memberRole(MemberRole.ADMIN)
                .build());

        관리자_토큰 = "Bearer " + provider.create(관리자.getId());
    }

    @Test
    void 도시를_모두_조회한다() {
        // when
        var 응답 = 토큰과_함께_페이지_번호와_사이즈로_도시_정보를_요청한다(관리자_토큰, 0, 1);

        // then
        도시_정보_페이지를_검증한다(응답, 1, 잠실동);
    }

    @Test
    void 도시를_저장한다() {
        // given
        var 신천동_정보 = 신천동_정보_생성();

        // when
        var 응답 = 토큰과_함께_도시_정보_저장(관리자_토큰, 신천동_정보);

        // then
        생성된_도시_정보를_검증한다(응답, 신천동_정보);
    }

    @Test
    void 도시_정보를_업데이트한다() {
        // given
        var 업데이트_정보 = 업데이트_정보_생성();

        // when
        var 응답 = 토큰과_함께_도시_정보_업데이트(관리자_토큰, 업데이트_정보);

        // then
        업데이트된_도시_정보를_검증한다(응답, 업데이트_정보);
    }

    @Test
    void 도시_정보를_제거한다() {
        // when
        var 응답 = 토큰과_함께_도시_정보를_제거한다(관리자_토큰);

        // then
        제거된_도시_정보를_검증한다(응답);
    }
}
