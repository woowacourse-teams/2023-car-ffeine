package com.carffeine.carffeine.auth.service;

import com.carffeine.carffeine.auth.domain.FakeRefreshTokenRepository;
import com.carffeine.carffeine.auth.domain.GoogleMember;
import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.domain.RefreshToken;
import com.carffeine.carffeine.auth.domain.RefreshTokenRepository;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import com.carffeine.carffeine.auth.service.dto.Tokens;
import com.carffeine.carffeine.fixture.oauth.OAuthFixture;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.MemberRepository;
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
    @Mock
    private TokenProvider tokenProvider;

    private MemberRepository memberRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        refreshTokenRepository = new FakeRefreshTokenRepository();
        memberRepository = new FakeMemberRepository();
        authService = new AuthService(tokenProvider, memberRepository, refreshTokenRepository, oAuthRequester);
    }

    @Test
    void 소셜_로그인_후_토큰을_반환한다() {
        // given
        given(oAuthRequester.login(any(), any()))
                .willReturn(new GoogleMember(OAuthFixture.구글_회원_정보));
        given(tokenProvider.create(any()))
                .willReturn("access token");
        given(tokenProvider.createRefreshToken(any()))
                .willReturn("refresh token");
        OAuthLoginRequest request = new OAuthLoginRequest("http://localhost:8080/", "carffeine");
        String provider = "google";

        // when
        OAuthMember oAuthMember = oAuthRequester.login(request, provider);
        Tokens token = authService.generateTokens(oAuthMember);

        // then
        assertThat(token).isEqualTo(new Tokens("access token", "refresh token"));
    }

    @Test
    void access_token을_반환한다() {
        // given
        given(tokenProvider.create(any()))
                .willReturn("access token");
        given(tokenProvider.extract(any()))
                .willReturn("refresh token");

        RefreshToken refreshToken = refreshTokenRepository.save(RefreshToken.builder()
                .tokenId("refresh token")
                .memberId(1L)
                .build()
        );

        // when
        String renewAccessToken = authService.renewAccessToken(refreshToken.getTokenId());

        // then
        assertThat(renewAccessToken).isEqualTo("access token");
    }
}
