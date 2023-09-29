package com.carffeine.carffeine.auth.service;

import com.carffeine.carffeine.auth.domain.OAuthMember;
import com.carffeine.carffeine.auth.domain.Provider;
import com.carffeine.carffeine.auth.domain.RefreshToken;
import com.carffeine.carffeine.auth.domain.RefreshTokenRepository;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.service.dto.Tokens;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Transactional
@RequiredArgsConstructor
@Service
public class AuthService {

    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final OAuthRequester oAuthRequester;

    public String loginUri(String redirectUri, String provider) {
        return oAuthRequester.loginUri(Provider.from(provider), redirectUri);
    }

    public Tokens generateTokens(OAuthMember oAuthMember) {
        Member member = getMember(oAuthMember);
        String tokenId = UUID.randomUUID().toString();

        String accessToken = tokenProvider.create(member.getId());
        String refreshToken = tokenProvider.createRefreshToken(tokenId);

        refreshTokenRepository.save(RefreshToken.builder()
                .tokenId(tokenId)
                .memberId(member.getId())
                .build());

        return new Tokens(accessToken, refreshToken);
    }

    private Member getMember(OAuthMember oAuthMember) {
        Member newMember = Member.builder()
                .email(oAuthMember.email())
                .name(oAuthMember.nickname())
                .imageUrl(oAuthMember.imageUrl())
                .memberRole(MemberRole.USER)
                .build();
        return memberRepository.findByEmail(oAuthMember.email())
                .orElseGet(() -> memberRepository.save(newMember));
    }

    public String renewAccessToken(String refreshToken) {
        String tokenId = tokenProvider.extract(refreshToken);
        return refreshTokenRepository.findByTokenId(tokenId)
                .map(it -> tokenProvider.create(it.getMemberId()))
                .orElseThrow();
    }

    public void logout(Long loginMember) {
        refreshTokenRepository.deleteByMemberId(loginMember);
    }
}
