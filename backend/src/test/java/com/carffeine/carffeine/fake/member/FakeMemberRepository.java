package com.carffeine.carffeine.fake.member;

import com.carffeine.carffeine.member.domain.member.Member;
import com.carffeine.carffeine.member.domain.member.MemberRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class FakeMemberRepository implements MemberRepository {

    private final Map<Long, Member> map = new HashMap<>();

    private Long id = 0L;

    @Override
    public Optional<Member> findById(final Long id) {
        return Optional.of(map.get(id));
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return map.values().stream()
                .filter(it -> it.getEmail().equals(email))
                .findFirst();
    }

    @Override
    public Member save(Member member) {
        id++;
        map.put(id, member);
        return member;
    }

    @Override
    public boolean existsById(Long id) {
        return map.containsKey(id);
    }
}
