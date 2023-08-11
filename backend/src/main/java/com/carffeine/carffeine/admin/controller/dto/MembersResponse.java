package com.carffeine.carffeine.admin.controller.dto;

import com.carffeine.carffeine.member.domain.Member;

public record MembersResponse(
        long id,
        String email,
        String role
) {

    public static MembersResponse from(Member member) {
        return new MembersResponse(member.getId(), member.maskEmail(), member.getMemberRole().name());
    }
}
