package com.carffeine.carffeine.auth.controller.interceptor;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

public class HttpMethodTest {

    @Test
    void 메서드의_이름이_같으면_true를_반환한다() {
        HttpMethod httpMethod = HttpMethod.GET;
        boolean matches = httpMethod.matches("GET");
        assertThat(matches).isTrue();
    }

    @Test
    void Any_메서드는_모든_메서드에_true를_반환한다() {
        HttpMethod httpMethod = HttpMethod.ANY;
        boolean matchGet = httpMethod.matches("GET");
        boolean matchPost = httpMethod.matches("POST");
        boolean matchPut = httpMethod.matches("PUT");
        boolean matchPatch = httpMethod.matches("PATCH");
        boolean matchDelete = httpMethod.matches("DELETE");

        assertSoftly(softly -> {
            softly.assertThat(matchGet).isTrue();
            softly.assertThat(matchPost).isTrue();
            softly.assertThat(matchPut).isTrue();
            softly.assertThat(matchPatch).isTrue();
            softly.assertThat(matchDelete).isTrue();
        });
    }
}
