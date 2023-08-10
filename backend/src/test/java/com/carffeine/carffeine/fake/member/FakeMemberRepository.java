package com.carffeine.carffeine.fake.member;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class FakeMemberRepository implements MemberRepository {

    private final Map<Long, Member> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public Optional<Member> findByEmail(String email) {
        return map.values().stream()
                .filter(it -> it.getEmail().equals(email))
                .findFirst();
    }

    @Override
    public Member save(Member member) {
        id++;
        Member savedMember = Member.builder()
                .id(id)
                .memberRole(member.getMemberRole())
                .email(member.getEmail())
                .build();
        map.put(id, savedMember);
        return savedMember;
    }

    @Override
    public boolean existsById(Long id) {
        return map.containsKey(id);
    }

    @Override
    public Optional<Member> findById(Long memberId) {
        return Optional.of(map.get(memberId));
    }
}
