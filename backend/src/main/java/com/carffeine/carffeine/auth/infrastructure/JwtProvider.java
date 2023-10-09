package com.carffeine.carffeine.auth.infrastructure;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.exception.AuthException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
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
    @Value("${jwt.access-token-expiration-period}")
    private long accessTokenExpirationPeriod;
    @Value("${jwt.refresh-token-expiration-period}")
    private long refreshTokenExpirationPeriod;
    private Key key;

    @PostConstruct
    private void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    @Override
    public String create(Long id) {
        Claims claims = Jwts.claims();
        claims.put("id", String.valueOf(id));
        return createToken(claims, accessTokenExpirationPeriod);
    }

    private String createToken(Claims claims, long expiredPeriod) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedAt())
                .setExpiration(expiredAt(expiredPeriod))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Date issuedAt() {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Date expiredAt(long expiredPeriod) {
        LocalDateTime now = LocalDateTime.now();
        return Date.from(now.plusHours(expiredPeriod).atZone(ZoneId.systemDefault()).toInstant());
    }

    @Override
    public String extract(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret.getBytes())
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id", String.class);
        } catch (SecurityException e) {
            throw new AuthException(SIGNITURE_NOT_FOUND);
        } catch (MalformedJwtException e) {
            throw new AuthException(MALFORMED_TOKEN);
        } catch (ExpiredJwtException e) {
            throw new AuthException(EXPIRED_TOKEN);
        } catch (UnsupportedJwtException e) {
            throw new AuthException(UNSUPPORTED_TOKEN);
        } catch (IllegalArgumentException e) {
            throw new AuthException(INVALID_TOKEN);
        }
    }

    @Override
    public String createRefreshToken(String tokenId) {
        Claims claims = Jwts.claims();
        claims.put("id", tokenId);
        return createToken(claims, refreshTokenExpirationPeriod);
    }
}
