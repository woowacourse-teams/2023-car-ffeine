package com.carffeine.carffeine.service.auth;

import com.carffeine.carffeine.domain.member.Member;
import com.carffeine.carffeine.domain.member.oauth.GoogleMember;
import com.carffeine.carffeine.fake.member.FakeMemberRepository;
import com.carffeine.carffeine.fixture.member.oauth.OAuthFixture;
import com.carffeine.carffeine.service.auth.dto.OAuthLoginRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private OAuthRequester oAuthRequester;

    private FakeMemberRepository memberRepository;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        memberRepository = new FakeMemberRepository();
        authService = new AuthService(memberRepository, oAuthRequester);
    }

    @Test
    void 소셜_로그인_후_회원을_반환한다() {
        // given
        given(oAuthRequester.login(any()))
                .willReturn(new GoogleMember(OAuthFixture.구글_회원_정보));

        // when
        Member member = authService.oAuthLogin(new OAuthLoginRequest("google", "carffeine"));

        // then
        Member findMember = memberRepository.findByEmail(member.getEmail()).get();
        assertThat(member).usingRecursiveComparison()
                .isEqualTo(findMember);
    }
}
