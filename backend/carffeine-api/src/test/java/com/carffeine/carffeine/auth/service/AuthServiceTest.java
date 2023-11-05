package com.carffeine.carffeine.auth.service;

import com.carffeine.carffeine.auth.domain.GoogleMember;
import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import com.carffeine.carffeine.fixture.oauth.OAuthFixture;
import com.carffeine.support.fake.member.FakeMemberRepository;
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
    @Mock
    private TokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        memberRepository = new FakeMemberRepository();
        authService = new AuthService(tokenProvider, memberRepository, oAuthRequester);
    }

    @Test
    void 소셜_로그인_후_토큰을_반환한다() {
        // given
        given(oAuthRequester.login(any(), any()))
                .willReturn(new GoogleMember(OAuthFixture.구글_회원_정보));
        given(tokenProvider.create(any()))
                .willReturn("token");
        OAuthLoginRequest request = new OAuthLoginRequest("http://localhost:8080/", "carffeine");
        String provider = "google";

        // when
        OAuthMember oAuthMember = oAuthRequester.login(request, provider);
        String token = authService.generateToken(oAuthMember);

        // then
        assertThat(token).isEqualTo("token");
    }
}
