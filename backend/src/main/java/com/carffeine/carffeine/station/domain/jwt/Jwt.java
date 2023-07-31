package com.carffeine.carffeine.station.domain.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.Date;

@Getter
@RequiredArgsConstructor
public class Jwt {

    private final String token;
    @Value("${jwt.secret}")
    private String secret;

    public boolean isExpired() {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

    public Long extractId() {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);
    }

    public Key gethmacShaKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}
