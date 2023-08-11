package com.carffeine.carffeine.member.service;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.fake.FakeFilterRepository;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.FakeMemberFilterRepository;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberFilter;
import com.carffeine.carffeine.member.domain.MemberFilterRepository;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MemberServiceTest {

    private MemberService memberService;
    private MemberRepository memberRepository;
    private MemberFilterRepository memberFilterRepository;
    private FilterRepository filterRepository;

    private Member member;

    @BeforeEach
    void setup() {
        memberRepository = new FakeMemberRepository();
        memberFilterRepository = new FakeMemberFilterRepository();
        filterRepository = new FakeFilterRepository();
        memberService = new MemberService(
                memberRepository,
                memberFilterRepository,
                filterRepository
        );

        member = memberRepository.save(Member.builder()
                .id(1L)
                .email("sosow0212@naver.com")
                .memberRole(MemberRole.USER)
                .build());
    }

    @Test
    void 회원이_등록한_모든_필터를_찾는다() {
        // given
        List<MemberFilter> memberFilters = memberFilterRepository.saveAll(
                List.of(new MemberFilter(member, Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName())))
        );

        // when
        List<Filter> result = memberService.findMemberFilters(member.getId(), member.getId());

        // then
        assertThat(memberFilters.get(0).getFilter().getName()).isEqualTo(result.get(0).getName());
    }

    @Test
    void 회원이_선호하는_필터를_등록한다() {
        // given
        filterRepository.saveAll(List.of(
                Filter.of("충전소 회사", FilterType.COMPANY.getName()),
                Filter.of("2.00", FilterType.CAPACITY.getName()),
                Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName())
        ));


        FiltersRequest filtersRequest = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "충전소 회사"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        // when
        List<MemberFilter> result = memberService.addMemberFilters(member.getId(), member.getId(), filtersRequest);

        // then
        List<MemberFilter> memberFilters = memberFilterRepository.findAllByMember(member);

        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(memberFilters.size());
        });
    }
}
