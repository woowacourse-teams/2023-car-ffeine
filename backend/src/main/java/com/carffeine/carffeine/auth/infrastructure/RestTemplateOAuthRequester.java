package com.carffeine.carffeine.auth.infrastructure;

import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.domain.Provider;
import com.carffeine.carffeine.auth.exception.AuthException;
import com.carffeine.carffeine.auth.exception.AuthExceptionType;
import com.carffeine.carffeine.auth.infrastructure.dto.OAuthTokenResponse;
import com.carffeine.carffeine.auth.service.OAuthProviderProperties;
import com.carffeine.carffeine.auth.service.OAuthRequester;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import static com.carffeine.carffeine.auth.service.OAuthProviderProperties.OAuthProviderProperty;

@RequiredArgsConstructor
@Component
public class RestTemplateOAuthRequester implements OAuthRequester {

    private static final String CODE = "code";
    private static final String GRANT_TYPE = "grant_type";
    private static final String AUTHORIZATION_CODE = "authorization_code";
    private static final String REDIRECT_URI = "redirect_uri";
    private static final String CLIENT_ID = "client_id";
    private static final String RESPONSE_TYPE = "response_type";
    private static final String SCOPE = "scope";

    private final RestTemplate restTemplate;
    private final OAuthProviderProperties oAuthProviderProperties;

    @Override
    public OAuthMember login(OAuthLoginRequest request, String requestProvider) {
        Provider provider = Provider.from(requestProvider);
        OAuthProviderProperty property = oAuthProviderProperties.getProviderProperties(provider);
        OAuthTokenResponse token = getAccessToken(property, request);
        return provider.getOAuthProvider(getUserAttributes(property, token));
    }

    @Override
    public String loginUri(Provider provider, String redirectUri) {
        OAuthProviderProperty providerProperties = oAuthProviderProperties.getProviderProperties(provider);
        return UriComponentsBuilder.fromUriString(providerProperties.getLoginUrl())
                .queryParam(CLIENT_ID, providerProperties.getId())
                .queryParam(REDIRECT_URI, redirectUri)
                .queryParam(RESPONSE_TYPE, CODE)
                .queryParam(SCOPE, providerProperties.getScope())
                .build()
                .toString();
    }

    private OAuthTokenResponse getAccessToken(OAuthProviderProperty property, OAuthLoginRequest loginRequest) {
        HttpHeaders headers = headerWithProviderSecret(property);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
        URI tokenUri = getTokenUri(property, loginRequest);
        return requestAccessToken(tokenUri, request);
    }

    private OAuthTokenResponse requestAccessToken(URI tokenUri, HttpEntity<MultiValueMap<String, String>> request) {
        try {
            return restTemplate.postForEntity(tokenUri, request, OAuthTokenResponse.class).getBody();
        } catch (Exception e) {
            throw new AuthException(AuthExceptionType.BAD_REQUEST_TO_PROVIDER);
        }
    }

    private HttpHeaders headerWithProviderSecret(OAuthProviderProperty property) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(property.getId(), property.getSecret());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return headers;
    }

    private URI getTokenUri(OAuthProviderProperty property, OAuthLoginRequest request) {
        return UriComponentsBuilder.fromUriString(property.getTokenUrl())
                .queryParam(CODE, URLDecoder.decode(request.code(), StandardCharsets.UTF_8))
                .queryParam(GRANT_TYPE, AUTHORIZATION_CODE)
                .queryParam(REDIRECT_URI, request.redirectUri())
                .build()
                .toUri();
    }

    private Map<String, Object> getUserAttributes(OAuthProviderProperty property, OAuthTokenResponse tokenResponse) {
        HttpHeaders headers = headerWithToken(tokenResponse);
        URI uri = URI.create(property.getInfoUrl());
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uri);
        return requestUserAttributes(requestEntity);
    }

    private Map<String, Object> requestUserAttributes(RequestEntity<?> requestEntity) {
        try {
            ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(requestEntity, new ParameterizedTypeReference<>() {
            });
            return responseEntity.getBody();
        } catch (Exception e) {
            throw new AuthException(AuthExceptionType.BAD_REQUEST_TO_PROVIDER);
        }
    }

    private HttpHeaders headerWithToken(OAuthTokenResponse tokenResponse) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(tokenResponse.accessToken());
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
