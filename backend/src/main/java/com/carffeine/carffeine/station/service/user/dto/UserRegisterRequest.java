package com.carffeine.carffeine.station.service.user.dto;

import com.carffeine.carffeine.station.domain.user.Users;

public record UserRegisterRequest(String username, String password, String email) {
    public Users toEntity() {
        return Users.builder()
                .userEmail(email)
                .password(password)
                .username(username)
                .build();
    }
}
