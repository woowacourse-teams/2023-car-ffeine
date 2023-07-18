package com.carffeine.carffeine.service.auth;

import com.carffeine.carffeine.domain.member.oauth.OAuthMember;
import com.carffeine.carffeine.service.auth.dto.OAuthLoginRequest;

public interface OAuthRequester {

    OAuthMember login(OAuthLoginRequest request);
}
