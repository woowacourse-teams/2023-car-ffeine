package com.carffeine.carffeine.service.auth;

import com.carffeine.carffeine.domain.member.Member;
import com.carffeine.carffeine.domain.member.MemberRepository;
import com.carffeine.carffeine.domain.member.oauth.OAuthMember;
import com.carffeine.carffeine.service.auth.dto.OAuthLoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final OAuthRequester restTemplateOauthRequester;

    @Transactional
    public Member oAuthLogin(OAuthLoginRequest request) {
        OAuthMember oAuthMember = restTemplateOauthRequester.login(request);

        return memberRepository.findByEmail(oAuthMember.email())
                .orElse(memberRepository.save(new Member(oAuthMember.email())));
    }
}
