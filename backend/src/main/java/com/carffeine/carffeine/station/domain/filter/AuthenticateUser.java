package com.carffeine.carffeine.station.domain.filter;

import com.carffeine.carffeine.station.domain.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@Getter
@AllArgsConstructor
public class AuthenticateUser {
    private String email;
    private Set<Role> roles;
}
