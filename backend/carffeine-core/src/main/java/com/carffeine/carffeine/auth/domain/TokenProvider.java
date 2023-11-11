package com.carffeine.carffeine.auth.domain;

public interface TokenProvider {

    String create(Long id);

    Long extract(String token);
}
