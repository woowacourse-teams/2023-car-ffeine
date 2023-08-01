package com.carffeine.carffeine.member.service;

import com.carffeine.carffeine.member.domain.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final TokenProvider tokenProvider;

    public String createJwt(Long memberId) {
        return tokenProvider.createJwt(memberId);
    }
}
