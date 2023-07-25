package com.carffeine.carffeine.station.service.security;

import com.carffeine.carffeine.station.infrastructure.api.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Value("${jwt.secret}")
    private String secretKey;

    private Long expiredMs = 1000 * 60 * 60L;

    public String login(String userName) {
        return JwtUtil.createJwt(userName, secretKey, expiredMs);
    }
}
