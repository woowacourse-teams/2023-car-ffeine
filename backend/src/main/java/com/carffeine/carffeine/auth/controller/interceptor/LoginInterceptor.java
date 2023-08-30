package com.carffeine.carffeine.auth.controller.interceptor;

import com.carffeine.carffeine.auth.controller.support.AuthenticationContext;
import com.carffeine.carffeine.auth.controller.support.AuthenticationExtractor;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.exception.AuthException;
import com.carffeine.carffeine.auth.exception.AuthExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Component
public class LoginInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;
    private final AuthenticationContext authenticationContext;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = AuthenticationExtractor.extract(request)
                .orElseThrow(() -> new AuthException(AuthExceptionType.UNAUTHORIZED));
        Long memberId = tokenProvider.extract(token);
        authenticationContext.setAuthentication(memberId);
        return true;
    }
}
