package com.carffeine.carffeine.member.domain.filter;

import com.carffeine.carffeine.member.domain.member.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberConnectorTypeFilterRepository extends Repository<MemberConnectorTypeFilter, Long> {

    @Query("SELECT c FROM MemberConnectorTypeFilter c JOIN FETCH c.connectorType WHERE c.member = :member")
    List<MemberConnectorTypeFilter> findAllByMember(@Param("member") Member member);

    <S extends MemberConnectorTypeFilter> List<S> saveAll(Iterable<S> connectorTypeFilters);

    void deleteAllByMember(Member member);
}
