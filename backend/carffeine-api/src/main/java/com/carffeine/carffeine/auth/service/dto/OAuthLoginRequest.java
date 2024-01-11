package com.carffeine.carffeine.auth.service.dto;

public record OAuthLoginRequest(
        String redirectUri,
        String code
) {
}
