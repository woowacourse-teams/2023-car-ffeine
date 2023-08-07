package com.carffeine.carffeine.auth.domain;

public interface TokenProvider {

    String create(Long id);

    boolean isExpired(String token);

    Long extract(String token);
}
