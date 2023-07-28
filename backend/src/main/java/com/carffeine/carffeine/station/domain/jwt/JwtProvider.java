package com.carffeine.carffeine.station.domain.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secret;

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public Jwt createJwt(Long id) {
        Claims claims = Jwts.claims();
        claims.put("id", id);
        String token = createToken(claims);
        return new Jwt(token);
    }

    private String createToken(Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(getIssuedAt())
                .setExpiration(getExpiration())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Date getIssuedAt() {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Date getExpiration() {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.plusHours(1).atZone(ZoneId.systemDefault()).toInstant());
    }
}
