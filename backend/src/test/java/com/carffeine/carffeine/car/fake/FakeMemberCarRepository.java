package com.carffeine.carffeine.car.fake;

import com.carffeine.carffeine.car.domain.MemberCar;
import com.carffeine.carffeine.car.domain.MemberCarRepository;
import com.carffeine.carffeine.member.domain.Member;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class FakeMemberCarRepository implements MemberCarRepository {

    private final Map<Long, MemberCar> map = new HashMap<>();
    private Long id = 0L;

    @Override
    public Optional<MemberCar> findByMember(Member member) {
        return map.values()
                .stream()
                .filter(it -> it.getMember().isSame(member.getId()))
                .findAny();
    }

    @Override
    public MemberCar save(MemberCar memberCar) {
        id++;
        map.put(id, memberCar);
        return map.get(id);
    }

    @Override
    public void deleteByMember(Member member) {
        boolean isExist = map.keySet()
                .stream()
                .anyMatch(it -> map.get(it).getMember().isSame(member.getId()));

        if (isExist) {
            Long key = map.keySet()
                    .stream()
                    .filter(it -> map.get(it).getMember().isSame(member.getId()))
                    .findAny()
                    .get();

            map.remove(key);
            key--;
        }
    }
}
