package com.carffeine.carffeine.member.service;

import com.carffeine.carffeine.fake.member.FakeMemberRepository;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeRequest;
import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.capacity.CapacityRepository;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.companyName.CompanyNameRepository;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorTypeRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.filter.fake.FakeCapacityRepository;
import com.carffeine.carffeine.filter.fake.FakeCompanyNameRepository;
import com.carffeine.carffeine.filter.fake.FakeConnectorTypeRepository;
import com.carffeine.carffeine.member.controller.dto.CarPersonalizationRequest;
import com.carffeine.carffeine.member.controller.dto.MemberCustomFilterRequest;
import com.carffeine.carffeine.member.controller.dto.MemberResponse;
import com.carffeine.carffeine.member.domain.filter.MemberCapacityFilterRepository;
import com.carffeine.carffeine.member.domain.filter.MemberCompanyNameFilterRepository;
import com.carffeine.carffeine.member.domain.filter.MemberConnectorTypeFilterRepository;
import com.carffeine.carffeine.member.domain.member.Member;
import com.carffeine.carffeine.member.domain.member.MemberRepository;
import com.carffeine.carffeine.member.domain.personalization.Personalization;
import com.carffeine.carffeine.member.domain.personalization.PersonalizationRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import com.carffeine.carffeine.member.fake.FakeMemberCapacityFilterRepository;
import com.carffeine.carffeine.member.fake.FakeMemberCompanyNameFilterRepository;
import com.carffeine.carffeine.member.fake.FakeMemberConnectorTypeRepository;
import com.carffeine.carffeine.member.fake.FakePersonalizationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MemberServiceTest {

    private MemberService memberService;
    private MemberRepository memberRepository;
    private MemberCompanyNameFilterRepository memberCompanyNameFilterRepository;
    private MemberCapacityFilterRepository memberCapacityFilterRepository;
    private MemberConnectorTypeFilterRepository memberConnectorTypeFilterRepository;
    private CompanyNameRepository companyNameRepository;
    private CapacityRepository capacityRepository;
    private ConnectorTypeRepository connectorTypeRepository;
    private PersonalizationRepository personalizationRepository;

    private Member member;

    @BeforeEach
    void setup() {
        memberRepository = new FakeMemberRepository();
        memberCompanyNameFilterRepository = new FakeMemberCompanyNameFilterRepository();
        memberCapacityFilterRepository = new FakeMemberCapacityFilterRepository();
        memberConnectorTypeFilterRepository = new FakeMemberConnectorTypeRepository();
        companyNameRepository = new FakeCompanyNameRepository();
        capacityRepository = new FakeCapacityRepository();
        connectorTypeRepository = new FakeConnectorTypeRepository();
        personalizationRepository = new FakePersonalizationRepository();
        memberService = new MemberService(
                memberRepository,
                memberCompanyNameFilterRepository,
                memberCapacityFilterRepository,
                memberConnectorTypeFilterRepository,
                companyNameRepository,
                capacityRepository,
                connectorTypeRepository,
                personalizationRepository
        );

        member = Member.builder()
                .id(1L)
                .email("test@test.com")
                .build();
        memberRepository.save(member);

        companyNameRepository.saveAll(List.of(CompanyName.from("HG", "환경부")));
        capacityRepository.saveAll(List.of(Capacity.from(BigDecimal.valueOf(2))));
        connectorTypeRepository.saveAll(List.of(ConnectorType.from("DC_COMBO", "충전기")));
    }

    @Test
    void 유저의_차량_정보를_등록한다() {
        // given
        CarPersonalizationRequest req = new CarPersonalizationRequest("아이오닉5", "2022-A");

        // when
        Personalization result = memberService.uploadCarPersonalization(member.getId(), req);

        // then
        assertThat(result.getCarName()).isEqualTo(req.name());
    }

    @Test
    void 유저의_차량_정보를_업데이트한다() {
        // given
        CarPersonalizationRequest beforeInfo = new CarPersonalizationRequest("아이오닉5", "2022-A");
        CarPersonalizationRequest updateInfo = new CarPersonalizationRequest("아이오닉6", "2022-A");

        // when
        memberService.uploadCarPersonalization(member.getId(), beforeInfo);
        Personalization result = memberService.uploadCarPersonalization(member.getId(), updateInfo);

        // then
        assertThat(result.getCarName()).isEqualTo(updateInfo.name());
    }

    @Test
    void 유저의_차량_정보를_조회한다() {
        // given
        CarPersonalizationRequest req = new CarPersonalizationRequest("아이오닉5", "2022-A");
        memberService.uploadCarPersonalization(member.getId(), req);

        // when
        MemberResponse result = memberService.findMemberPersonalization(member.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.userId()).isEqualTo(member.getId());
            softly.assertThat(result.car().name()).isEqualTo(req.name());
        });
    }

    @Test
    void 유저의_차량_정보가_없다면_예외를_발생한다() {
        // when & then
        assertThatThrownBy(() -> memberService.findMemberPersonalization(member.getId()))
                .isInstanceOf(MemberException.class)
                .hasMessage(MemberExceptionType.PERSONALIZATION_NOT_FOUND.message());
    }

    @Test
    void 유저의_커스텀_필터를_등록한다() {
        // given
        MemberCustomFilterRequest req = new MemberCustomFilterRequest(
                List.of(new CompanyNameRequest("HG", "환경부")),
                List.of(BigDecimal.valueOf(2)),
                List.of(new ConnectorTypeRequest("DC_COMBO", "충전기"))
        );

        // when
        FiltersResponse result = memberService.addCustomFiltersByMember(member.getId(), req);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.connectorTypes().get(0).key()).isEqualTo(req.connectorTypes().get(0).key());
            softly.assertThat(result.capacities().get(0)).isEqualTo(req.capacities().get(0));
            softly.assertThat(result.companyNames().get(0).key()).isEqualTo(req.companyNames().get(0).key());
        });
    }

    @Test
    void 없는_필터를_등록하면_예외를_발생시킨다() {
        // given
        MemberCustomFilterRequest req = new MemberCustomFilterRequest(
                List.of(new CompanyNameRequest("HGXX", "환경부")),
                List.of(BigDecimal.valueOf(2)),
                List.of(new ConnectorTypeRequest("DC_COMBO", "충전기"))
        );

        // when & then
        assertThatThrownBy(() -> memberService.addCustomFiltersByMember(member.getId(), req))
                .isInstanceOf(FilterException.class)
                .hasMessage(FilterExceptionType.FILTER_NOT_FOUND.message());
    }

    @Test
    void 유저가_등록한_커스텀_필터들을_조회한다() {
        // given
        MemberCustomFilterRequest req = new MemberCustomFilterRequest(
                List.of(new CompanyNameRequest("HG", "환경부")),
                List.of(BigDecimal.valueOf(2)),
                List.of(new ConnectorTypeRequest("DC_COMBO", "충전기"))
        );

        FiltersResponse userFilters = memberService.addCustomFiltersByMember(member.getId(), req);

        // when
        FiltersResponse result = memberService.findFilterChooseByMember(member.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(userFilters.companyNames().get(0).key()).isEqualTo(result.companyNames().get(0).key());
            softly.assertThat(userFilters.connectorTypes().get(0).key()).isEqualTo(result.connectorTypes().get(0).key());
            softly.assertThat(userFilters.capacities().get(0)).isEqualTo(result.capacities().get(0));
        });
    }
}
