package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.dto.FiltersRequest;
import com.carffeine.carffeine.filter.fake.FakeFilterRepository;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
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
class FilterServiceTest {

    private FilterService filterService;
    private FilterRepository filterRepository;
    private MemberRepository memberRepository;

    private Member admin;

    @BeforeEach
    void setup() {
        filterRepository = new FakeFilterRepository();
        memberRepository = new FakeMemberRepository();
        filterService = new FilterService(filterRepository, memberRepository);

        admin = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());
    }

    @Test
    void 필터를_모두_조회한다() {
        // given
        String filterName = "충전소명";

        // when
        filterRepository.saveAll(List.of(Filter.of(filterName, FilterType.COMPANIES.getName())));
        List<Filter> filters = filterService.findAllFilters(admin.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(filters.size()).isEqualTo(1);
            softly.assertThat(filters.get(0).getName()).isEqualTo(filterName);
        });
    }

    @Test
    void 필터를_저장한다() {
        // given
        FiltersRequest filtersRequest = new FiltersRequest(
                List.of("충전소 회사"),
                List.of("2"),
                List.of("DC_COMBO")
        );

        // when
        filterService.addFilters(admin.getId(), filtersRequest);

        // then
        List<Filter> filters = filterService.findAllFilters(admin.getId());
        assertThat(filters.size()).isEqualTo(3);
    }

    @Test
    void 필터를_제거한다() {
        // given
        FiltersRequest filtersRequest = new FiltersRequest(
                List.of("충전소 회사"),
                List.of("2"),
                List.of("DC_COMBO")
        );
        filterService.addFilters(admin.getId(), filtersRequest);

        // when
        filterRepository.deleteByName("충전소 회사");

        // then
        List<Filter> filters = filterService.findAllFilters(admin.getId());
        assertThat(filters.size()).isEqualTo(2);
    }
}
