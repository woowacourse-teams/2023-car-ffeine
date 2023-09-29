package com.carffeine.carffeine.auth.service.dto;

public record Tokens(
        String accessToken,
        String refreshToken
) {
}
