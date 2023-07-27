package com.carffeine.carffeine.station.domain.filter;

import com.carffeine.carffeine.station.domain.jwt.Jwt;
import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import com.carffeine.carffeine.station.service.security.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter implements Filter {

    private static final int TOKEN_START_INDEX = 7;
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String ROLE_USER = "ROLE_USER";
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    @Value("${jwt.secret}")
    private final String secretKey;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException {
        Object attribute = request.getAttribute(VerifyUserFilter.AUTHENTICATE_USER);
        if (attribute instanceof AuthenticateUser authenticateUser) {
            Map<String, Object> claims = new HashMap<>();
            String authenticateUserJson = objectMapper.writeValueAsString(authenticateUser);
            claims.put(VerifyUserFilter.AUTHENTICATE_USER, authenticateUserJson);
            Jwt jwt = jwtProvider.createJwt(claims);
            userService.updateRefreshToken(authenticateUser.getEmail(), jwt.refreshToken());
            String json = objectMapper.writeValueAsString(jwt);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
            return;
        }

        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value());
    }
}
