package com.carffeine.carffeine.auth.infra;

import com.carffeine.carffeine.auth.infrastructure.dto.OAuthTokenResponse;
import com.carffeine.carffeine.fixture.oauth.OAuthFixture;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@RequestMapping("/oauth2")
@RestController
public class FakeGoogleController {

    @PostMapping("/v4/token")
    public OAuthTokenResponse generateToken(
            @RequestParam String code,
            @RequestParam(name = "grant_type") String grantType,
            @RequestParam(name = "redirect_uri") String redirectUri,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader
    ) {
        if (isValidTypes(code, grantType, redirectUri, authorizationHeader)) {
            return new OAuthTokenResponse("accessToken", "scope", "Bearer");
        }
        throw new RuntimeException();
    }

    private boolean isValidTypes(String code, String grantType, String redirectUri, String authorizationHeader) {
        return isBasicAuthValid(authorizationHeader) &&
                code.equals("carffeine") &&
                grantType.equals("authorization_code") &&
                redirectUri.equals("http://localhost:8080/");
    }

    private boolean isBasicAuthValid(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Basic ")) {
            return false;
        }

        String base64Credentials = authorizationHeader.substring("Basic ".length()).trim();
        byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
        String decodedCredentials = new String(decodedBytes, StandardCharsets.UTF_8);
        String[] secretAndID = decodedCredentials.split(":");
        String id = secretAndID[0];
        String secret = secretAndID[1];
        if (id.equals("google-client-id") && secret.equals("google-secret")) {
            return true;
        }
        return false;
    }

    @GetMapping("/v2/userinfo")
    public Map<String, Object> getUserInfo(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader
    ) {
        if (authorizationHeader.equals("Bearer accessToken")) {
            return OAuthFixture.구글_회원_정보;
        }
        throw new RuntimeException();
    }
}
