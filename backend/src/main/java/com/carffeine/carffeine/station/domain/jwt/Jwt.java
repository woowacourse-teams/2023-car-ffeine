package com.carffeine.carffeine.station.domain.jwt;

import io.jsonwebtoken.Jwts;

import java.util.Date;

public record Jwt(String accessToken) {

    public boolean isExpired(String token, String secret) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

    public Long extractId(String token, String secretKey) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);
    }
}
