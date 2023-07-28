package com.carffeine.carffeine.station.domain.member;

import org.springframework.data.repository.Repository;

public interface MemberRepository extends Repository<Member, Long> {

    Member findById(Long id);
}
