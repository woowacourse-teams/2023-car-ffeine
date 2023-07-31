package com.carffeine.carffeine.station.service.auth;

import com.carffeine.carffeine.station.domain.jwt.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private Jwt jwt;

    public String createJwt(Long memberId) {
        return jwt.createJwt(memberId);
    }
}
