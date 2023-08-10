package com.carffeine.carffeine.member.fake;

import com.carffeine.carffeine.member.domain.filter.MemberCompanyNameFilter;
import com.carffeine.carffeine.member.domain.filter.MemberCompanyNameFilterRepository;
import com.carffeine.carffeine.member.domain.member.Member;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class FakeMemberCompanyNameFilterRepository implements MemberCompanyNameFilterRepository {

    private final Map<Long, MemberCompanyNameFilter> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public List<MemberCompanyNameFilter> findAllByMember(final Member member) {
        return map.values().stream()
                .filter(it -> it.getMember().getId().equals(member.getId()))
                .collect(toList());
    }

    @Override
    public <S extends MemberCompanyNameFilter> List<S> saveAll(final Iterable<S> companyNameFilters) {
        List<S> savedCompanyNameFilters = new ArrayList<>();

        for (S companyNameFilter : companyNameFilters) {
            id++;
            map.put(id, companyNameFilter);
            savedCompanyNameFilters.add(companyNameFilter);
        }

        return savedCompanyNameFilters;
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
