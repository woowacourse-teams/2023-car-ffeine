package com.carffeine.carffeine.member.fake;

import com.carffeine.carffeine.member.domain.filter.MemberCapacityFilter;
import com.carffeine.carffeine.member.domain.filter.MemberCapacityFilterRepository;
import com.carffeine.carffeine.member.domain.member.Member;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class FakeMemberCapacityFilterRepository implements MemberCapacityFilterRepository {

    private final Map<Long, MemberCapacityFilter> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public List<MemberCapacityFilter> findAllByMember(final Member member) {
        return map.values().stream()
                .filter(it -> it.getMember().getId().equals(member.getId()))
                .collect(toList());
    }

    @Override
    public <S extends MemberCapacityFilter> List<S> saveAll(final Iterable<S> capacities) {
        List<S> savedCapacityFilters = new ArrayList<>();

        for (S capacity : capacities) {
            id++;
            map.put(id, capacity);
            savedCapacityFilters.add(capacity);
        }

        return savedCapacityFilters;
    }

    @Override
    public void deleteAllByMember(final Member member) {
        List<Long> keys = map.keySet()
                .stream()
                .filter(it -> map.get(it).getMember().getId().equals(member.getId()))
                .toList();

        for (Long key : keys) {
            map.remove(key);
        }
    }
}
