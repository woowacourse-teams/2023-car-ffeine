package com.carffeine.carffeine.member.domain;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class MemberFilterRepositoryTest {

    @Autowired
    private MemberFilterRepository memberFilterRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FilterRepository filterRepository;

    private Member member;
    private List<Filter> filters;

    @BeforeEach
    void setup() {
        member = memberRepository.save(Member.builder()
                .id(1L)
                .email("sosow0212@naver.com")
                .memberRole(MemberRole.USER)
                .build());

        filters = filterRepository.saveAll(List.of(
                Filter.of("충전소 회사", FilterType.COMPANY.getName()),
                Filter.of("2.00", FilterType.CAPACITY.getName()),
                Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName())
        ));
    }

    @Test
    void 회원이_등록한_모든_필터를_찾는다() {
        // given
        memberFilterRepository.saveAll(List.of(new MemberFilter(member, filters.get(0))));

        // when
        List<MemberFilter> memberFilter = memberFilterRepository.findAllByMember(member);

        // then
        assertThat(memberFilter.size()).isEqualTo(1);
    }

    @Test
    void 회원이_등록한_필터를_모두_제거한다() {
        // given
        memberFilterRepository.saveAll(List.of(new MemberFilter(member, filters.get(0))));

        // when
        memberFilterRepository.deleteAllByMember(member);

        // then
        List<MemberFilter> result = memberFilterRepository.findAllByMember(member);
        assertThat(result.size()).isEqualTo(0);
    }

    @Test
    void 회원의_필터를_모두_저장한다() {
        // when
        memberFilterRepository.saveAll(List.of(new MemberFilter(member, filters.get(0))));

        // then
        List<MemberFilter> result = memberFilterRepository.findAllByMember(member);
        assertThat(result.size()).isEqualTo(1);
    }
}
