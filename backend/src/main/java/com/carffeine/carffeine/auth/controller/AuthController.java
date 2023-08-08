package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.auth.controller.dto.LoginUriResponse;
import com.carffeine.carffeine.auth.controller.dto.TokenResponse;
import com.carffeine.carffeine.auth.service.AuthService;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/oauth/{provider}/login-uri")
    public ResponseEntity<LoginUriResponse> getRedirectUri(
            @PathVariable String provider,
            @RequestParam String redirectUri
    ) {
        String loginUri = authService.loginUri(redirectUri, provider);
        return ResponseEntity.ok(new LoginUriResponse(loginUri));
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
