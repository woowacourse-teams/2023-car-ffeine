package com.carffeine.carffeine.member.domain.personalization;

import com.carffeine.carffeine.member.domain.member.Member;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface PersonalizationRepository extends Repository<Personalization, Long> {

    Personalization save(Personalization personalization);

    boolean existsByMember(Member member);

    Optional<Personalization> findByMember(Member member);
}
