package com.carffeine.carffeine.member.fake;

import com.carffeine.carffeine.member.domain.member.Member;
import com.carffeine.carffeine.member.domain.personalization.Personalization;
import com.carffeine.carffeine.member.domain.personalization.PersonalizationRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class FakePersonalizationRepository implements PersonalizationRepository {

    private final Map<Long, Personalization> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public Personalization save(final Personalization personalization) {
        id++;
        map.put(id, personalization);
        return personalization;
    }

    @Override
    public boolean existsByMember(final Member member) {
        return map.values()
                .stream()
                .anyMatch(it -> it.getMember().getId().equals(member.getId()));
    }

    @Override
    public Optional<Personalization> findByMember(final Member member) {
        return map.values()
                .stream()
                .filter(it -> it.getMember().getId().equals(member.getId()))
                .findAny();
    }
}
