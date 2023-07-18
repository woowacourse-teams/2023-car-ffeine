package com.carffeine.carffeine.domain.member.oauth;

import com.carffeine.carffeine.domain.member.exception.MemberException;
import com.carffeine.carffeine.domain.member.exception.MemberExceptionType;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum Provider {

    GOOGLE("google", GoogleMember::new),
    ;

    private final String providerName;
    private final Function<Map<String, Object>, OAuthMember> function;

    Provider(String providerName, Function<Map<String, Object>, OAuthMember> function) {
        this.providerName = providerName;
        this.function = function;
    }

    public static Provider from(String name) {
        return Arrays.stream(values())
                .filter(it -> it.providerName.equals(name))
                .findFirst()
                .orElseThrow(() -> new MemberException(MemberExceptionType.INVALID_AUTH_PROVIDER));
    }

    public OAuthMember getOAuthProvider(Map<String, Object> body) {
        return function.apply(body);
    }
}
