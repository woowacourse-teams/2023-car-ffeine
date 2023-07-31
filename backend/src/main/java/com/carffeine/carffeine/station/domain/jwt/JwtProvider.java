package com.carffeine.carffeine.station.domain.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class JwtProvider {

    private Jwt jwt;

    public Jwt createJwt(Long id) {
        Claims claims = Jwts.claims();
        claims.put("id", id);
        String token = createToken(claims);
        return new Jwt(token);
    }

    private String createToken(Claims claims) {
        Key key = jwt.gethmacShaKey();

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
