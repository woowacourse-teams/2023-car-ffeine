package com.carffeine.carffeine.station.domain.security;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface MemberRepository extends Repository<Member, Long> {

    Member findByEmail(String email);

    Member findById(Long id);

    Member save(Member member);

    List<Member> findAll();
}
