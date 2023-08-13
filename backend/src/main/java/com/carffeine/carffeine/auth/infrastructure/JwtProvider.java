package com.carffeine.carffeine.auth.infrastructure;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static com.carffeine.carffeine.auth.exception.AuthExceptionType.EXPIRED_TOKEN;
import static com.carffeine.carffeine.auth.exception.AuthExceptionType.INVALID_TOKEN;
import static com.carffeine.carffeine.auth.exception.AuthExceptionType.MALFORMED_TOKEN;
import static com.carffeine.carffeine.auth.exception.AuthExceptionType.SIGNITURE_NOT_FOUND;
import static com.carffeine.carffeine.auth.exception.AuthExceptionType.UNSUPPORTED_TOKEN;

@Getter
@Component
@NoArgsConstructor
public class JwtProvider implements TokenProvider {

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration-period}")
    private int expirationPeriod;
    private Key key;

    @PostConstruct
    private void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    @Override
    public String create(Long id) {
        Claims claims = Jwts.claims();
        claims.put("id", id);
        return createToken(claims);
    }

    private String createToken(Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedAt())
                .setExpiration(expiredAt())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Date issuedAt() {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Date expiredAt() {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.plusHours(expirationPeriod).atZone(ZoneId.systemDefault()).toInstant());
    }

    @Override
    public Long extract(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret.getBytes())
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id", Long.class);
        } catch (SecurityException e) {
            throw new JwtException(SIGNITURE_NOT_FOUND.message());
        } catch (MalformedJwtException e) {
            throw new JwtException(MALFORMED_TOKEN.message());
        } catch (ExpiredJwtException e) {
            throw new JwtException(EXPIRED_TOKEN.message());
        } catch (UnsupportedJwtException e) {
            throw new JwtException(UNSUPPORTED_TOKEN.message());
        } catch (IllegalArgumentException e) {
            throw new JwtException(INVALID_TOKEN.message());
        }
    }

    @Override
    public void validate(String token) {
        extract(token);
    }
}
