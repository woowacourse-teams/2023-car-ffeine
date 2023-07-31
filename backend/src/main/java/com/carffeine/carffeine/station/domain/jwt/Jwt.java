package com.carffeine.carffeine.station.domain.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Getter
@Component
@NoArgsConstructor
public class Jwt {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationPeriod}")
    private int expirationPeriod;

    public String createJwt(Long id) {
        Claims claims = Jwts.claims();
        claims.put("id", id);
        return createToken(claims);
    }

    private String createToken(Claims claims) {
        Key key = gethmacShaKey();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(getIssuedAt())
                .setExpiration(getExpiration())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Key gethmacShaKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    private Date getIssuedAt() {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Date getExpiration() {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.plusHours(expirationPeriod).atZone(ZoneId.systemDefault()).toInstant());
    }

    public boolean isExpired(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

    public Long extractId(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);
    }
}
