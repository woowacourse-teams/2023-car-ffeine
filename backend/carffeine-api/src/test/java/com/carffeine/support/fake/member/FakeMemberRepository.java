package com.carffeine.support.fake.member;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.List;
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

    @Override
    public Page<Member> findAll(Pageable pageable) {
        List<Member> members = map.values().stream()
                .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), members.size());
        List<Member> pagedStations = members.subList(start, end);
        return new PageImpl<>(pagedStations, pageable, members.size());
    }
}
