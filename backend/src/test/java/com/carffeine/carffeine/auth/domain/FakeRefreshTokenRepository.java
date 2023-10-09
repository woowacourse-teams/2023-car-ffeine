package com.carffeine.carffeine.auth.domain;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

public class FakeRefreshTokenRepository implements RefreshTokenRepository {

    private final Map<Long, RefreshToken> database = new HashMap<>();
    private final AtomicLong id = new AtomicLong(1L);

    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        long id = this.id.getAndIncrement();
        RefreshToken savedRefreshToken = RefreshToken.builder()
                .id(id)
                .tokenId(refreshToken.getTokenId())
                .memberId(refreshToken.getMemberId())
                .build();
        database.put(id, savedRefreshToken);
        return savedRefreshToken;
    }

    @Override
    public Optional<RefreshToken> findByTokenId(String tokenId) {
        return database.values().stream()
                .filter(it -> it.getTokenId().equals(tokenId))
                .findFirst();
    }

    @Override
    public void deleteByMemberId(Long loginMember) {
        database.values().stream()
                .filter(it -> it.getMemberId().equals(loginMember))
                .findFirst()
                .ifPresent(it -> database.remove(it.getId()));
    }
}
