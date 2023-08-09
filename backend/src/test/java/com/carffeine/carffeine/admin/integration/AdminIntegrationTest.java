package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.수정할_충전소_정보;
import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.충전소_상세_정보_응답을_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.충전소_정보_페이지를_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.충전소가_수정된_응답을_검증한다;
import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.토큰과_충전소_ID로_충전소_정보를_수정한다;
import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.토큰과_충전소_ID로_충전소_정보를_요청한다;
import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.토큰과_함께_충전소_이름과_페이지_번호와_사이즈로_충전소_정보를_요청한다;
import static com.carffeine.carffeine.admin.integration.AdminIntegrationTestFixture.토큰과_함께_페이지_번호와_사이즈로_충전소_정보를_요청한다;
import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.상태_코드를_검증한다;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AdminIntegrationTest extends IntegrationTest {

    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TokenProvider provider;

    private Station 선릉_충전소;
    private Station 잠실_충전소;
    private Member 관리자;
    private Member 일반_회원;
    private String 관리자_토큰;
    private String 일반_회원_토큰;

    @BeforeEach
    void setUp() {
        선릉_충전소 = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        잠실_충전소 = StationFixture.잠실역_충전소_충전기_2개_사용가능_1개;

        관리자 = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());
        관리자_토큰 = "Bearer " + provider.create(관리자.getId());

        일반_회원 = memberRepository.save(Member.builder()
                .memberRole(MemberRole.USER)
                .build());
        일반_회원_토큰 = "Bearer " + provider.create(일반_회원.getId());
    }

    @SuppressWarnings("NonAsciiCharacters")
    @Nested
    class Admin으로_충전소의_목록_정보를_조회할_때 {

        @Test
        void 정상_응답한다() {
            // given
            stationRepository.save(잠실_충전소);
            stationRepository.save(선릉_충전소);

            // when
            var 응답 = 토큰과_함께_페이지_번호와_사이즈로_충전소_정보를_요청한다(관리자_토큰, 0, 1);

            // then
            충전소_정보_페이지를_검증한다(응답, 2, 잠실_충전소);
            상태_코드를_검증한다(응답, HttpStatus.OK);
        }

        @Test
        void 검색어와_함께_정상_응답한다() {
            // given
            stationRepository.save(잠실_충전소);
            stationRepository.save(선릉_충전소);

            // when
            var 응답 = 토큰과_함께_충전소_이름과_페이지_번호와_사이즈로_충전소_정보를_요청한다(관리자_토큰, "잠실", 0, 1);

            // then
            충전소_정보_페이지를_검증한다(응답, 1, 잠실_충전소);
            상태_코드를_검증한다(응답, HttpStatus.OK);
        }

        @Test
        void 관리자가_아니라면_예외가_발생한다() {
            // given
            stationRepository.save(잠실_충전소);
            stationRepository.save(선릉_충전소);

            // when
            var 응답 = 토큰과_함께_충전소_이름과_페이지_번호와_사이즈로_충전소_정보를_요청한다(일반_회원_토큰, "잠실", 0, 1);

            // then
            상태_코드를_검증한다(응답, HttpStatus.FORBIDDEN);
        }
    }

    @Nested
    class Admin으로_충전소와_충전기_상세_정보를_조회할_때 {

        @Test
        void 정상_응답한다() {
            // given
            stationRepository.save(잠실_충전소);

            // when
            var 응답 = 토큰과_충전소_ID로_충전소_정보를_요청한다(관리자_토큰, 잠실_충전소.getStationId());

            // then
            충전소_상세_정보_응답을_검증한다(응답, 잠실_충전소);
            상태_코드를_검증한다(응답, HttpStatus.OK);
        }

        @Test
        void 관리자가_아니라면_예외가_발생한다() {
            // given
            stationRepository.save(잠실_충전소);

            // when
            var 응답 = 토큰과_충전소_ID로_충전소_정보를_요청한다(일반_회원_토큰, 잠실_충전소.getStationId());

            // then
            상태_코드를_검증한다(응답, HttpStatus.FORBIDDEN);
        }
    }

    @Nested
    class 충전소_정보를_수정할_때 {

        @Test
        void 정상_수정한다() {
            // given
            stationRepository.save(잠실_충전소);
            var 수정_요청 = 수정할_충전소_정보();

            // when
            var 응답 = 토큰과_충전소_ID로_충전소_정보를_수정한다(관리자_토큰, 잠실_충전소.getStationId(), 수정_요청);

            // then
            충전소가_수정된_응답을_검증한다(토큰과_충전소_ID로_충전소_정보를_요청한다(관리자_토큰, 잠실_충전소.getStationId()), 수정_요청);
            상태_코드를_검증한다(응답, HttpStatus.NO_CONTENT);
        }

        @Test
        void 관리자가_아니라면_예외가_발생한다() {
            // given
            stationRepository.save(잠실_충전소);
            var 수정_요청 = 수정할_충전소_정보();

            // when
            var 응답 = 토큰과_충전소_ID로_충전소_정보를_수정한다(일반_회원_토큰, 잠실_충전소.getStationId(), 수정_요청);

            // then
            상태_코드를_검증한다(응답, HttpStatus.FORBIDDEN);
        }
    }
}
