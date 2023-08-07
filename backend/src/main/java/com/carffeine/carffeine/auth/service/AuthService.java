package com.carffeine.carffeine.auth.service;

import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.domain.Provider;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.service.dto.OAuthLoginRequest;
import com.carffeine.carffeine.auth.service.dto.OAuthUriRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final OAuthRequester oAuthRequester;

    @Transactional
    public String oAuthLogin(OAuthLoginRequest request, String provider) {
        OAuthMember oAuthMember = oAuthRequester.login(request, provider);
        Member member = memberRepository.findByEmail(oAuthMember.email())
                .orElseGet(() -> memberRepository.save(new Member(oAuthMember.email())));
        return tokenProvider.create(member.getId());
    }

    public String loginUri(OAuthUriRequest request, String provider) {
        return oAuthRequester.loginUri(Provider.from(provider), request.redirectUri());
    }
}
