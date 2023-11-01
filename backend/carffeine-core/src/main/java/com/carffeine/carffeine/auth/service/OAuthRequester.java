package com.carffeine.carffeine.auth.service;

import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.domain.Provider;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;

public interface OAuthRequester {

    OAuthMember login(OAuthLoginRequest request, String provider);

    String loginUri(Provider provider, String redirectUri);
}
