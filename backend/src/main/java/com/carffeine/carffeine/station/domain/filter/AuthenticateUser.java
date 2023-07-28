package com.carffeine.carffeine.station.domain.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticateUser {
    private Long id;
    private String email;
}
