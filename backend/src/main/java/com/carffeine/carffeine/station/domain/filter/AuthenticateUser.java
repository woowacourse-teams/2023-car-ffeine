package com.carffeine.carffeine.station.domain.filter;

import com.carffeine.carffeine.station.domain.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticateUser {
    private Long id;
    private String email;
    private Role role;
}
