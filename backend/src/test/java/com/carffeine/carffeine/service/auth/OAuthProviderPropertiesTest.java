package com.carffeine.carffeine.service.auth;

import com.carffeine.carffeine.domain.member.oauth.Provider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

import static com.carffeine.carffeine.service.auth.OAuthProviderProperties.OAuthProviderProperty;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class OAuthProviderPropertiesTest {

    @Autowired
    private OAuthProviderProperties oAuthProviderProperties;

    @Test
    void yml_파일의_속성을_읽어온다() {
        Map<Provider, OAuthProviderProperty> provider = oAuthProviderProperties.getProvider();

        OAuthProviderProperty oAuthProviderProperty = provider.get(Provider.GOOGLE);

        assertSoftly(softly -> {
            softly.assertThat(oAuthProviderProperty.getId()).isEqualTo("google-client-id");
            softly.assertThat(oAuthProviderProperty.getSecret()).isEqualTo("google-secret");
            softly.assertThat(oAuthProviderProperty.getTokenUrl()).isEqualTo("http://localhost:8080/oauth2/v4/token");
            softly.assertThat(oAuthProviderProperty.getInfoUrl()).isEqualTo("http://localhost:8080/oauth2/v2/userinfo");
            softly.assertThat(oAuthProviderProperty.getRedirectUrl()).isEqualTo("google-redirect-url");
        });
    }
}
