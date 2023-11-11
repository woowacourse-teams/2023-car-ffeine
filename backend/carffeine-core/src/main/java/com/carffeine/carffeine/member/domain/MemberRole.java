package com.carffeine.carffeine.member.domain;

import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum MemberRole {
    USER("user"),
    ADMIN("admin");

    private final String value;

    MemberRole(String value) {
        this.value = value;
    }

    public static MemberRole from(String role) {
        return Arrays.stream(MemberRole.values())
                .filter(it -> it.value.equalsIgnoreCase(role))
                .findFirst()
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND_ROLE));
    }
}
