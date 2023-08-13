package com.carffeine.carffeine.member.fixture;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRole;

public class MemberFixture {

    public static final Member 일반_회원 = Member.builder()
            .id(1L)
            .email("boxster@email.com")
            .name("user")
            .memberRole(MemberRole.USER)
            .build();

    public static final Member 일반_회원2 = Member.builder()
            .id(2L)
            .email("kiara@email.com")
            .name("kiara")
            .memberRole(MemberRole.USER)
            .build();

    public static final Member 관리자_회원 = Member.builder()
            .id(2L)
            .email("admin@email.com")
            .name("admin")
            .memberRole(MemberRole.ADMIN)
            .build();
}
