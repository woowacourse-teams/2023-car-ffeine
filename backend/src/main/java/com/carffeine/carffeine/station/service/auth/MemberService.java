package com.carffeine.carffeine.station.service.auth;

import com.carffeine.carffeine.station.domain.jwt.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final Jwt jwt;

    public String createJwt(Long memberId) {
        return jwt.createJwt(memberId);
    }
}
