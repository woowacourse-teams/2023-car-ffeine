package com.carffeine.carffeine.member.domain.filter;

import com.carffeine.carffeine.member.domain.member.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberCompanyNameFilterRepository extends Repository<MemberCompanyNameFilter, Long> {

    @Query("SELECT f FROM MemberCompanyNameFilter f JOIN FETCH f.companyName WHERE f.member = :member")
    List<MemberCompanyNameFilter> findAllByMember(@Param("member") Member member);

    <S extends MemberCompanyNameFilter> List<S> saveAll(Iterable<S> companyNameFilters);

    void deleteAllByMember(Member member);
}
