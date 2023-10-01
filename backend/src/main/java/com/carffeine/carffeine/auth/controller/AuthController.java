package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.auth.controller.dto.LoginUriResponse;
import com.carffeine.carffeine.auth.controller.dto.TokenResponse;
import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.auth.controller.support.RefreshTokenCookieGenerator;
import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.service.AuthService;
import com.carffeine.carffeine.auth.service.OAuthRequester;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import com.carffeine.carffeine.auth.service.dto.Tokens;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final OAuthRequester oAuthRequester;
    private final RefreshTokenCookieGenerator refreshTokenCookieGenerator;

    @GetMapping("/oauth/{provider}/login-uri")
    public ResponseEntity<LoginUriResponse> getRedirectUri(
            @PathVariable String provider,
            @RequestParam("redirect-uri") String redirectUri
    ) {
        String loginUri = authService.loginUri(redirectUri, provider);
        return ResponseEntity.ok(new LoginUriResponse(loginUri));
    }

    @PostMapping("/oauth/{provider}/login")
    public ResponseEntity<TokenResponse> login(
            @RequestBody OAuthLoginRequest request,
            @PathVariable String provider
    ) {
        OAuthMember oAuthMember = oAuthRequester.login(request, provider);
        Tokens tokens = authService.generateTokens(oAuthMember);
        String cookie = refreshTokenCookieGenerator.createCookie(tokens.refreshToken()).toString();
        log.info("cookie ={}", cookie);
        return ResponseEntity.ok()
                .header(SET_COOKIE, cookie)
                .body(new TokenResponse(tokens.accessToken()));
    }

    @PostMapping("/renew")
    public ResponseEntity<TokenResponse> renewAccessToken(@CookieValue(value = "refresh-token") String refreshToken) {
        String accessToken = authService.renewAccessToken(refreshToken);
        return ResponseEntity.ok(new TokenResponse(accessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logOut(@AuthMember Long loginMember) {
        authService.logout(loginMember);
        return ResponseEntity.ok()
                .header(SET_COOKIE, refreshTokenCookieGenerator.createLogoutCookie().toString())
                .build();
    }

}
