package com.carffeine.carffeine.auth.service;

import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.domain.Provider;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.member.domain.member.Member;
import com.carffeine.carffeine.member.domain.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final OAuthRequester oAuthRequester;

    public String loginUri(String redirectUri, String provider) {
        return oAuthRequester.loginUri(Provider.from(provider), redirectUri);
    }

    @Transactional
    public String generateToken(OAuthMember oAuthMember) {
        Member member = memberRepository.findByEmail(oAuthMember.email())
                .orElseGet(() -> memberRepository.save(new Member(oAuthMember.email())));
        return tokenProvider.create(member.getId());
    }
}
