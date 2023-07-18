package com.carffeine.carffeine.infra.oauth;

import com.carffeine.carffeine.domain.member.oauth.OAuthMember;
import com.carffeine.carffeine.domain.member.oauth.Provider;
import com.carffeine.carffeine.service.auth.OAuthProviderProperties;
import com.carffeine.carffeine.service.auth.OAuthRequester;
import com.carffeine.carffeine.service.auth.dto.OAuthLoginRequest;
import com.carffeine.carffeine.service.auth.dto.OAuthTokenResponse;
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

import static com.carffeine.carffeine.service.auth.OAuthProviderProperties.OAuthProviderProperty;

@RequiredArgsConstructor
@Component
public class RestTemplateOAuthRequester implements OAuthRequester {

    private static final String CODE = "code";
    private static final String GRANT_TYPE = "grant_type";
    private static final String AUTHORIZATION_CODE = "authorization_code";
    private static final String REDIRECT_URI = "redirect_uri";

    private final RestTemplate restTemplate;
    private final OAuthProviderProperties oAuthProviderProperties;

    public OAuthMember login(OAuthLoginRequest request) {
        Provider provider = Provider.from(request.provider());
        OAuthProviderProperty property = oAuthProviderProperties.getProviderProperties(provider);
        OAuthTokenResponse token = requestAccessToken(property, request);
        return provider.getOAuthProvider(getUserAttributes(property, token));
    }

    private OAuthTokenResponse requestAccessToken(OAuthProviderProperty property, OAuthLoginRequest codeRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(property.getId(), property.getSecret());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
        URI tokenUri = getTokenUri(property, codeRequest.code());
        return restTemplate.postForEntity(tokenUri, request, OAuthTokenResponse.class).getBody();
    }

    private URI getTokenUri(OAuthProviderProperty property, String code) {
        return UriComponentsBuilder.fromUriString(property.getTokenUrl())
                .queryParam(CODE, URLDecoder.decode(code, StandardCharsets.UTF_8))
                .queryParam(GRANT_TYPE, AUTHORIZATION_CODE)
                .queryParam(REDIRECT_URI, property.getRedirectUrl())
                .build()
                .toUri();
    }

    private Map<String, Object> getUserAttributes(OAuthProviderProperty property, OAuthTokenResponse tokenResponse) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(tokenResponse.accessToken());
        headers.setContentType(MediaType.APPLICATION_JSON);
        URI uri = URI.create(property.getInfoUrl());
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.GET, uri);
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(requestEntity, new ParameterizedTypeReference<>() {
        });
        return responseEntity.getBody();
    }
}
