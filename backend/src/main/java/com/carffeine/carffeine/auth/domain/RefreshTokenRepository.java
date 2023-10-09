package com.carffeine.carffeine.auth.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface RefreshTokenRepository extends Repository<RefreshToken, Long> {

    RefreshToken save(RefreshToken refreshToken);

    Optional<RefreshToken> findByTokenId(String refreshToken);

    void deleteByMemberId(Long loginMember);
}
