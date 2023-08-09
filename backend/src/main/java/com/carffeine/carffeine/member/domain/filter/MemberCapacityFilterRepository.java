package com.carffeine.carffeine.member.domain.filter;

import com.carffeine.carffeine.member.domain.member.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberCapacityFilterRepository extends Repository<MemberCapacityFilter, Long> {

    @Query("SELECT c FROM MemberCapacityFilter c JOIN FETCH c.capacity WHERE c.member = :member")
    List<MemberCapacityFilter> findAllByMember(@Param("member") Member member);

    <S extends MemberCapacityFilter> List<S> saveAll(Iterable<S> capacityFilters);

    void deleteAllByMember(Member member);
}
