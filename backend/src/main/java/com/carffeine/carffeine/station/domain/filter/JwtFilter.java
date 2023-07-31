package com.carffeine.carffeine.station.domain.filter;

import com.carffeine.carffeine.station.domain.jwt.Jwt;
import com.carffeine.carffeine.station.domain.member.Member;
import com.carffeine.carffeine.station.domain.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private static final int TOKEN_START_INDEX = 7;
    private static final String BEARER_PREFIX = "Bearer ";

    private final MemberRepository memberRepository;
    @Autowired
    private Jwt jwt;

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

        String token = authorization.substring(TOKEN_START_INDEX);

        if (jwt.isExpired(token)) {
            filterChain.doFilter(request, response);
        }

        Long id = jwt.extractId(token);

        Member member = memberRepository.findById(id);
        if (member == null) {
            filterChain.doFilter(request, response);
        }
    }

    private void sendUnauthorizedError(HttpServletResponse response, String errorMessage) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, errorMessage);
    }
}
