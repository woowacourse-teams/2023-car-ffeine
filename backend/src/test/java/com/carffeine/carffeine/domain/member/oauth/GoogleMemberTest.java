package com.carffeine.carffeine.domain.member.oauth;

import com.carffeine.carffeine.fixture.member.oauth.OAuthFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class GoogleMemberTest {

    @Test
    void 구글_회원을_생성한다() {
        Map<String, Object> attributes = OAuthFixture.구글_회원_정보;

        GoogleMember googleMember = new GoogleMember(attributes);

        assertSoftly(softly -> {
            softly.assertThat(googleMember.id()).isEqualTo("12345");
            softly.assertThat(googleMember.email()).isEqualTo("carffeine@gmail.com");
            softly.assertThat(googleMember.nickname()).isEqualTo("카페인");
            softly.assertThat(googleMember.imageUrl()).isEqualTo("https://image.com");
        });
    }
}
