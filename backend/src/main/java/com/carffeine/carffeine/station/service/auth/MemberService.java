package com.carffeine.carffeine.station.service.auth;

import com.carffeine.carffeine.station.domain.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    public String createJwt(Long memberId) {
        Jwt jwt = new Jwt();
        return jwt.createJwt(memberId);
    }
}
