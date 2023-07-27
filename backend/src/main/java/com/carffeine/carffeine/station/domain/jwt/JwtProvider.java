package com.carffeine.carffeine.station.domain.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtProvider {

    private static final long EXPIRE_IN_TWO_MONTHS = 1000L * 60 * 60 * 24 * 60;
    private static final long EXPIRE_IN_AN_HOUR = 1000L * 60 * 60;
    private static final String AUTHENTICATE_USER = "authenticateUser";

    @Value("${jwt.secret}")
    private String secret;

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    public Jwt createJwt(Map<String, Object> claims) {
        String accessToken = createToken(claims, getExpireDateAccessToken());
        String refreshToken = createToken(new HashMap<>(), getExpireDateRefreshToken());
        return new Jwt(accessToken, refreshToken);
    }

    public String createToken(Map<String, Object> claims, LocalDateTime expireDate) {
        return Jwts.builder()
                .setSubject(claims.get(AUTHENTICATE_USER).toString())
                .setClaims(claims)
                .setExpiration(Date.from(expireDate.atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public LocalDateTime getExpireDateAccessToken() {
        LocalDateTime now = LocalDateTime.now();
        return now.plusSeconds(EXPIRE_IN_AN_HOUR);
    }

    public LocalDateTime getExpireDateRefreshToken() {
        LocalDateTime now = LocalDateTime.now();
        return now.plusSeconds(EXPIRE_IN_TWO_MONTHS);
    }
}
