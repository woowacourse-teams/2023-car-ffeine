package com.carffeine.carffeine.member.domain;

public interface TokenProvider {

    String createJwt(Long id);

    boolean isExpired(String token);

    Long extract(String token);
}
