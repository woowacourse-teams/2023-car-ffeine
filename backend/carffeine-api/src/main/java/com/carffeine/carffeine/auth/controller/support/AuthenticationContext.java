package com.carffeine.carffeine.auth.controller.support;

import com.carffeine.carffeine.auth.exception.AuthException;
import com.carffeine.carffeine.auth.exception.AuthExceptionType;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import java.util.Objects;

@RequestScope
@Component
public class AuthenticationContext {

    private static final long ANONYMOUS_MEMBER = -1L;
    private Long memberId;

    public void setAuthentication(Long memberId) {
        this.memberId = memberId;
    }

    public Long getPrincipal() {
        if (Objects.isNull(this.memberId)) {
            throw new AuthException(AuthExceptionType.UNAUTHORIZED);
        }
        return memberId;
    }

    public void setAnonymous() {
        this.memberId = ANONYMOUS_MEMBER;
    }
}
