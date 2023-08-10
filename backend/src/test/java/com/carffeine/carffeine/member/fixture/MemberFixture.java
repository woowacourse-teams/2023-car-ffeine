package com.carffeine.carffeine.member.fixture;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRole;

public class MemberFixture {
    public static final Member 일반_회원 = Member.builder()
            .id(1L)
            .email("boxster@email.com")
            .memberRole(MemberRole.USER)
            .build();
}
