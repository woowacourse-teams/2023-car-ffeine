package com.carffeine.carffeine.station.domain.filter;

import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import com.carffeine.carffeine.station.domain.user.Role;
import com.carffeine.carffeine.station.exception.AuthorizationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.util.PatternMatchUtils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.carffeine.carffeine.station.exception.StationExceptionType.NO_AUTHORIZATION;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter implements Filter {
    private final String[] whiteListUris = new String[]{"/user/login", "/auth/refresh/token", "/user/register", "*/h2-console*"};
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        if (whiteListCheck(httpServletRequest.getRequestURI())) {
            chain.doFilter(request, response);
            return;
        }
        if (!isContainToken(httpServletRequest)) {
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "인증 오류");
            return;
        }
        try {
            String token = getToken(httpServletRequest);
            AuthenticateUser authenticateUser = getAuthenticateUser(token);
            verifyAuthorization(httpServletRequest.getRequestURI(), authenticateUser);
            log.info("값 : {}", authenticateUser.getEmail());
            chain.doFilter(request, response);
        } catch (JsonParseException e) {
            log.error("JsonParseException");
            httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value());
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException e) {
            log.error("JwtException");
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "인증 오류");
        } catch (ExpiredJwtException e) {
            log.error("JwtTokenExpired");
            httpServletResponse.sendError(HttpStatus.FORBIDDEN.value(), "토큰이 만료 되었습니다");
        } catch (AuthorizationException e) {
            log.error("AuthorizationException");
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "권한이 없습니다");
        }
    }

    private boolean whiteListCheck(String uri) {
        return PatternMatchUtils.simpleMatch(whiteListUris, uri);
    }

    private boolean isContainToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        return authorization != null && authorization.startsWith("Bearer ");
    }

    private String getToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        return authorization.substring(7);
    }

    private AuthenticateUser getAuthenticateUser(String token) throws JsonProcessingException {
        Claims claims = jwtProvider.getClaims(token);
        String authenticateUserJson = claims.get(VerifyUserFilter.AUTHENTICATE_USER, String.class);
        return objectMapper.readValue(authenticateUserJson, AuthenticateUser.class);
    }

    private void verifyAuthorization(String uri, AuthenticateUser user) {
        if (PatternMatchUtils.simpleMatch("*/admin*", uri) && !user.getRoles().contains(Role.ADMIN)) {
            throw new AuthorizationException(NO_AUTHORIZATION);
        }
    }
}
