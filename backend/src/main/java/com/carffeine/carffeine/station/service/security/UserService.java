package com.carffeine.carffeine.station.service.security;

import com.carffeine.carffeine.station.domain.jwt.Jwt;
import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final JwtProvider jwtProvider;

    public String createJwt(Long userId) {
        Jwt jwt = jwtProvider.createJwt(userId);
        return jwt.accessToken();
    }
}
