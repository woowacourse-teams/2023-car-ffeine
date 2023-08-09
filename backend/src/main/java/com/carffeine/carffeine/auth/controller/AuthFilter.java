package com.carffeine.carffeine.auth.controller;

import com.carffeine.carffeine.common.exception.ExceptionResponse;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
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

    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper;
    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorization == null) {
            sendUnauthorizedError(response, "토큰이 존재하지 않습니다");
            return;
        }

        if (!authorization.startsWith(BEARER_PREFIX)) {
            sendUnauthorizedError(response, "토큰이 올바르지 않습니다");
            return;
        }

        String token = authorization.substring(BEARER_PREFIX.length());

        if (tokenProvider.isExpired(token)) {
            sendUnauthorizedError(response, "이미 만료된 토큰입니다");
            return;
        }

        if (!isMemberExists(token)) {
            sendUnauthorizedError(response, "등록되지 않은 회원입니다");
            return;
        }
        filterChain.doFilter(request, response);
    }

    private void sendUnauthorizedError(HttpServletResponse response, String errorMessage) throws IOException {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpServletResponse.SC_UNAUTHORIZED, errorMessage);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getWriter(), exceptionResponse);
    }

    private boolean isMemberExists(String token) {
        Long id = tokenProvider.extract(token);
        return memberRepository.existsById(id);
    }
}
