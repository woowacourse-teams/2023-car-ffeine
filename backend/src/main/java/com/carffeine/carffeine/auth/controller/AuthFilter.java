package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.common.exception.ExceptionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class AuthFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";

    private final ObjectMapper objectMapper;
    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorization == null) {
            request.setAttribute("loginMember", -1L);
            filterChain.doFilter(request, response);
            return;
        }

        if (!authorization.startsWith(BEARER_PREFIX)) {
            sendUnauthorizedError(response, "토큰이 올바르지 않습니다");
            return;
        }

        String token = authorization.substring(BEARER_PREFIX.length());
        Long memberId = tokenProvider.extract(token);
        request.setAttribute("loginMember", memberId);
        filterChain.doFilter(request, response);
    }

    private void sendUnauthorizedError(HttpServletResponse response, String errorMessage) throws IOException {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), errorMessage);
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getWriter(), exceptionResponse);
    }
}
