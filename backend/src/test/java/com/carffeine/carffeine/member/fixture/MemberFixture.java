package com.carffeine.carffeine.member.fixture;

import com.carffeine.carffeine.member.domain.member.Member;

public class MemberFixture {

    public static Member createMember() {
        return new Member("test@test.com");
    }
}
