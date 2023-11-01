package com.carffeine.carffeine.filter.domain;

import com.carffeine.carffeine.member.domain.Member;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface MemberFilterRepository extends Repository<MemberFilter, Long> {

    List<MemberFilter> findAllByMember(Member member);

    void deleteAllByMember(Member member);

    <S extends MemberFilter> List<S> saveAll(Iterable<S> memberFilters);
}
