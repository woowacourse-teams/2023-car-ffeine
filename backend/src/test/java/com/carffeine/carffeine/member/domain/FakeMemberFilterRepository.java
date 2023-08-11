package com.carffeine.carffeine.member.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeMemberFilterRepository implements MemberFilterRepository {

    private final Map<Long, MemberFilter> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public List<MemberFilter> findAllByMember(final Member member) {
        return map.values()
                .stream()
                .toList();
    }

    @Override
    public void deleteAllByMember(final Member member) {
        List<Long> keys = map.keySet()
                .stream()
                .filter(it -> map.get(it).getMember().equals(member))
                .toList();

        keys.forEach(map::remove);
    }

    @Override
    public <S extends MemberFilter> List<S> saveAll(final Iterable<S> memberFilters) {
        List<S> savedMemberFilters = new ArrayList<>();

        for (S memberFilter : memberFilters) {
            id++;
            map.put(id, memberFilter);
            savedMemberFilters.add(memberFilter);
        }

        return savedMemberFilters;
    }
}
