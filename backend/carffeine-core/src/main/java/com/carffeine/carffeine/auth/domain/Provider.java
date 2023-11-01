package com.carffeine.carffeine.auth.domain;

import com.carffeine.carffeine.auth.exception.AuthException;
import com.carffeine.carffeine.auth.exception.AuthExceptionType;

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
                .orElseThrow(() -> new AuthException(AuthExceptionType.INVALID_AUTH_PROVIDER));
    }

    public OAuthMember getOAuthProvider(Map<String, Object> body) {
        return function.apply(body);
    }
}
