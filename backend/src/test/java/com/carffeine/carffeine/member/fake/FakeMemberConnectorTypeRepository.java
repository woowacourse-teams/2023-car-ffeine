package com.carffeine.carffeine.member.fake;

import com.carffeine.carffeine.member.domain.filter.MemberConnectorTypeFilter;
import com.carffeine.carffeine.member.domain.filter.MemberConnectorTypeFilterRepository;
import com.carffeine.carffeine.member.domain.member.Member;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class FakeMemberConnectorTypeRepository implements MemberConnectorTypeFilterRepository {

    private final Map<Long, MemberConnectorTypeFilter> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public List<MemberConnectorTypeFilter> findAllByMember(final Member member) {
        return map.values().stream()
                .filter(it -> it.getMember().getId().equals(member.getId()))
                .collect(toList());
    }

    @Override
    public <S extends MemberConnectorTypeFilter> List<S> saveAll(final Iterable<S> memberConnectorTypeFilter) {
        List<S> savedConnectorTypeFilters = new ArrayList<>();

        for (S connectorType : memberConnectorTypeFilter) {
            id++;
            map.put(id, connectorType);
            savedConnectorTypeFilters.add(connectorType);
        }

        return savedConnectorTypeFilters;
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
