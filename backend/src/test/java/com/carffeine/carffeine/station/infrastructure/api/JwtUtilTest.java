package com.carffeine.carffeine.station.infrastructure.api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class JwtUtilTest {

    private Long id;
    private String secretKey;
    private Long expiredMs;

    @BeforeEach
    void setUp() {
        id = 1L;
        secretKey = "hello";
        expiredMs = 1000 * 60 * 60L;
    }

    @Test
    void 유효기간이_1시간인_토큰은_1시간이_되기전에_만료되지_않는다() {
        // given
        String token = JwtUtil.createJwtById(id, secretKey, expiredMs);

        // when
        boolean isExpired = JwtUtil.isExpired(token, secretKey);

        // then
        assertThat(isExpired).isFalse();
    }

    @Test
    void 유효기간이_1초인_토큰은_1초_뒤_만료된다() throws InterruptedException {
        // given
        expiredMs = 1000L;
        String token = JwtUtil.createJwtById(id, secretKey, expiredMs);

        // when
        Thread.sleep(3000L);

        // then
        assertThatThrownBy(() -> JwtUtil.isExpired(token, secretKey));
    }

    @Test
    void 토큰에서_사용자의_id를_추출한다() {
        // given
        String token = JwtUtil.createJwtById(id, secretKey, expiredMs);

        // when
        Long memberId = JwtUtil.extractId(token, secretKey);

        // then
        assertThat(memberId).isEqualTo(id);
    }
}
