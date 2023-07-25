package com.carffeine.carffeine.station.infrastructure.api;

import com.carffeine.carffeine.station.service.security.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtFiler extends OncePerRequestFilter {

    private static final int TOKEN_START_INDEX = 7;
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String USER = "USER";
    private final UserService userService;
    private final String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization: {}", authorization);

        // Token 안보내면 return
        if (authorization == null || !authorization.startsWith(BEARER_PREFIX)) {
            log.error("authorization을 잘못 보냈습니다");
            filterChain.doFilter(request, response);
            return;
        }

        // Token 추출
        String token = authorization.substring(TOKEN_START_INDEX);

        // Token 만료 여부 확인
        if (JwtUtil.isExpired(token, secretKey)) {
            log.error("Token이 만료되었습니다");
            filterChain.doFilter(request, response);
            return;
        }

        // Token에서 userName 추출
        String userName = JwtUtil.extractUserName(token, secretKey);
        log.info("userName: {}", userName);

        // 권한 부여
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userName, null, List.of(new SimpleGrantedAuthority(USER)));

        // Detail을 넣어준다
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);
    }
}
