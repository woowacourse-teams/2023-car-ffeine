package com.carffeine.carffeine.member.domain;

import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface MemberCarRepository extends Repository<MemberCar, Long> {

    Optional<MemberCar> findByMember(Member member);

    MemberCar save(MemberCar memberCar);

    void deleteByMember(Member member);
}
