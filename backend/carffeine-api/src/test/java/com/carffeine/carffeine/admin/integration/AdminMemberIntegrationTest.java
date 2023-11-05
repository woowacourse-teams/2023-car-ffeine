package com.carffeine.carffeine.admin.integration;

import com.carffeine.carffeine.admin.service.dto.MemberRoleUpdateRequest;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.support.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.carffeine.carffeine.admin.integration.AdminMemberIntegrationTestFixture.토큰과_함께_페이지_번호와_사이즈로_회원_정보를_요청한다;
import static com.carffeine.carffeine.admin.integration.AdminMemberIntegrationTestFixture.토큰과_함께_회원의_권한을_변경한다;
import static com.carffeine.carffeine.admin.integration.AdminMemberIntegrationTestFixture.회원_정보_페이지를_검증한다;
import static com.carffeine.support.AcceptanceTestFixture.상태_코드를_검증한다;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AdminMemberIntegrationTest extends IntegrationTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TokenProvider provider;

    private Member 관리자;
    private Member 일반_회원;
    private String 관리자_토큰;
    private String 일반_회원_토큰;

    @BeforeEach
    void setUp() {
        관리자 = memberRepository.save(Member.builder()
                .name("admin")
                .email("admin@email.com")
                .memberRole(MemberRole.ADMIN)
                .build());
        관리자_토큰 = "Bearer " + provider.create(관리자.getId());

        일반_회원 = memberRepository.save(Member.builder()
                .name("user")
                .email("user@email.com")
                .memberRole(MemberRole.USER)
                .build());
        일반_회원_토큰 = "Bearer " + provider.create(일반_회원.getId());
    }

    @Nested
    class 회원_목록을_페이지로_조회할_때 {

        @Test
        void 정상_응답한다() {
            //given
            memberRepository.save(Member.builder()
                    .name("user")
                    .email("user@email.com1")
                    .memberRole(MemberRole.USER)
                    .build());

            // when
            var 응답 = 토큰과_함께_페이지_번호와_사이즈로_회원_정보를_요청한다(관리자_토큰, 0, 1);

            // then
            상태_코드를_검증한다(응답, HttpStatus.OK);
            회원_정보_페이지를_검증한다(응답, 3, 관리자);
        }

        @Test
        void 관리자가_아니라면_예외가_발생한다() {
            // given & when
            var 응답 = 토큰과_함께_페이지_번호와_사이즈로_회원_정보를_요청한다(일반_회원_토큰, 0, 1);

            // then
            상태_코드를_검증한다(응답, HttpStatus.FORBIDDEN);
        }
    }

    @Nested
    class 회원_권한을_변경할_때 {

        @Test
        void 정상_응답한다() {
            //given
            var 변경할_권한_요청 = new MemberRoleUpdateRequest("admin");

            // when
            var 응답 = 토큰과_함께_회원의_권한을_변경한다(관리자_토큰, 일반_회원, 변경할_권한_요청);

            // then
            상태_코드를_검증한다(응답, HttpStatus.NO_CONTENT);
        }
    }
}
