package com.carffeine.carffeine.auth.domain;

public interface TokenProvider {

    String create(Long id);

    String extract(String token);

    String createRefreshToken(String id);
}
