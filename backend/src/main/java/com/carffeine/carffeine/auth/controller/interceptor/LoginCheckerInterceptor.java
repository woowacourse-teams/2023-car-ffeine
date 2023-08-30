package com.carffeine.carffeine.auth.controller.interceptor;

import com.carffeine.carffeine.auth.controller.support.AuthenticationContext;
import com.carffeine.carffeine.auth.controller.support.AuthenticationExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Component
public class LoginCheckerInterceptor implements HandlerInterceptor {

    private final LoginInterceptor loginInterceptor;
    private final AuthenticationContext authenticationContext;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (AuthenticationExtractor.extract(request).isEmpty()) {
            authenticationContext.setNotLogin();
            return true;
        }
        return loginInterceptor.preHandle(request, response, handler);
    }
}
