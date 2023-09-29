package com.carffeine.carffeine.auth.controller.support;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RefreshTokenCookieGenerator {

    private static final String REFRESH_TOKEN = "refreshToken";
    private static final String VALID_COOKIE_PATH = "/";
    private static final String LOGOUT_COOKIE_VALUE = "";
    private static final int LOGOUT_COOKIE_AGE = 0;

    @Value("${jwt.refresh-token-expiration-period}")
    private long expireLength;

    public ResponseCookie createCookie(String refreshToken) {
        return ResponseCookie.from(REFRESH_TOKEN, refreshToken)
                .maxAge(Duration.ofMillis(expireLength))
                .path(VALID_COOKIE_PATH)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .build();
    }

    public ResponseCookie createLogoutCookie() {
        return ResponseCookie.from(REFRESH_TOKEN, LOGOUT_COOKIE_VALUE)
                .maxAge(LOGOUT_COOKIE_AGE)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .build();
    }

}
