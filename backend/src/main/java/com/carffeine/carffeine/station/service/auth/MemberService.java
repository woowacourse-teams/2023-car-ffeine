package com.carffeine.carffeine.station.service.auth;

import com.carffeine.carffeine.station.domain.jwt.Jwt;
import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final JwtProvider jwtProvider;

    public String createJwt(Long memberId) {
        Jwt jwt = jwtProvider.createJwt(memberId);
        return jwt.getToken();
    }
}
