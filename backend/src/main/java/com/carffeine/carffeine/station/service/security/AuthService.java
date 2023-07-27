package com.carffeine.carffeine.station.service.security;

import com.carffeine.carffeine.station.domain.security.Member;
import com.carffeine.carffeine.station.domain.security.MemberRepository;
import com.carffeine.carffeine.station.infrastructure.api.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;

    @Value("${jwt.secret}")
    private String secretKey;

    private Long expiredMs = 1000 * 60 * 60L;

    @Transactional
    public String makeJwt() {
        Member member = new Member("aaa@gmail.com");
        memberRepository.save(member);
        Long id = member.getId();
        return JwtUtil.createJwtById(id, secretKey, expiredMs);
    }
}
