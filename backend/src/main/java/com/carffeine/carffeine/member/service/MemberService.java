package com.carffeine.carffeine.member.service;

import com.carffeine.carffeine.member.infrastructure.JWTProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final JWTProvider tokenProvider;

    public String createJwt(Long memberId) {
        return tokenProvider.createJwt(memberId);
    }
}
