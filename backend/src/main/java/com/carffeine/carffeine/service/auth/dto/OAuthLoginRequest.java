package com.carffeine.carffeine.service.auth.dto;

public record OAuthLoginRequest(
        String provider,
        String code
) {
}
