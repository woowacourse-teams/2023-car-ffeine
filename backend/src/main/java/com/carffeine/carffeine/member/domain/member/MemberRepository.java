package com.carffeine.carffeine.member.domain.member;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MemberRepository extends Repository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Member save(Member member);

    boolean existsById(Long id);
}
