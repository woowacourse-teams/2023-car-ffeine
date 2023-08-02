package com.carffeine.carffeine.member.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticateMember {

    private Long id;
    private String email;
}
