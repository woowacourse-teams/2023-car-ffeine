package com.carffeine.carffeine.infra.oauth;

import com.carffeine.carffeine.domain.member.oauth.OAuthMember;
import com.carffeine.carffeine.service.auth.OAuthRequester;
import com.carffeine.carffeine.service.auth.dto.OAuthLoginRequest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class RestTemplateOAuthRequesterTest {

    @LocalServerPort
    private int port;

    @Autowired
    private OAuthRequester requester;

    @BeforeEach
    void setUp() {
        port = RestAssured.DEFAULT_PORT;
    }

    @Test
    void 구글_로그인을_하면_회원_정보를_반환한다() {
        // given
        OAuthLoginRequest request = new OAuthLoginRequest("google", "carffeine");

        // when & then
        OAuthMember googleMember = requester.login(request);
        assertSoftly(softly -> {
            softly.assertThat(googleMember.id()).isEqualTo("12345");
            softly.assertThat(googleMember.email()).isEqualTo("carffeine@gmail.com");
            softly.assertThat(googleMember.nickname()).isEqualTo("카페인");
            softly.assertThat(googleMember.imageUrl()).isEqualTo("https://image.com");
        });
    }
}
