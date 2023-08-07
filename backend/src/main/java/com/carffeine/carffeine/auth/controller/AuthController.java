package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.auth.controller.dto.LoginUriResponse;
import com.carffeine.carffeine.auth.controller.dto.TokenResponse;
import com.carffeine.carffeine.auth.service.AuthService;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import com.carffeine.carffeine.auth.service.dto.OAuthUriRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/oauth/{provider}/login-uri")
    public ResponseEntity<LoginUriResponse> getRedirectUri(
            @PathVariable String provider,
            @RequestBody OAuthUriRequest request
    ) {
        String redirectUri = authService.loginUri(request, provider);
        return ResponseEntity.ok(new LoginUriResponse(redirectUri));
    }

    @PostMapping("/oauth/{provider}/login")
    public ResponseEntity<TokenResponse> login(
            @RequestBody OAuthLoginRequest request,
            @PathVariable String provider
    ) {
        String token = authService.oAuthLogin(request, provider);
        return ResponseEntity.ok(new TokenResponse(token));
    }
}
