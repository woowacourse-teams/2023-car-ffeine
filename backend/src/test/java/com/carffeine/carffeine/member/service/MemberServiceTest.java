package com.carffeine.carffeine.member.service;

import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.exception.CarException;
import com.carffeine.carffeine.car.exception.CarExceptionType;
import com.carffeine.carffeine.car.fake.FakeCarRepository;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.fake.FakeFilterRepository;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.FakeMemberCarRepository;
import com.carffeine.carffeine.member.domain.FakeMemberFilterRepository;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberCar;
import com.carffeine.carffeine.member.domain.MemberCarRepository;
import com.carffeine.carffeine.member.domain.MemberFilter;
import com.carffeine.carffeine.member.domain.MemberFilterRepository;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.carffeine.carffeine.car.fixture.CarFixture.createCar;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MemberServiceTest {

    private MemberService memberService;
    private MemberRepository memberRepository;
    private MemberFilterRepository memberFilterRepository;
    private FilterRepository filterRepository;
    private MemberCarRepository memberCarRepository;
    private CarRepository carRepository;

    private Member member;

    @BeforeEach
    void setup() {
        memberRepository = new FakeMemberRepository();
        memberFilterRepository = new FakeMemberFilterRepository();
        filterRepository = new FakeFilterRepository();
        memberCarRepository = new FakeMemberCarRepository();
        carRepository = new FakeCarRepository();
        memberService = new MemberService(
                memberRepository,
                memberFilterRepository,
                filterRepository,
                memberCarRepository,
                carRepository
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
        assertThat(memberFilters.get(0).getFilter().equals(result.get(0))).isTrue();
    }

    @Test
    void 다른_회원의_필터를_조회하면_예외를_반환한다() {
        // when & then
        assertThatThrownBy(() -> memberService.findMemberFilters(member.getId() + 1, member.getId()))
                .isInstanceOf(MemberException.class)
                .hasMessage(MemberExceptionType.INVALID_ACCESS.message());
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
        assertThat(result.size()).isEqualTo(memberFilters.size());
    }

    @Test
    void 다른_회원의_필터를_등록하면_예외를_반환한다() {
        // when & then
        assertThatThrownBy(() -> memberService.addMemberFilters(member.getId() + 1, member.getId(), null))
                .isInstanceOf(MemberException.class)
                .hasMessage(MemberExceptionType.INVALID_ACCESS.message());
    }

    @Test
    void 회원이_등록한_차량을_조회한다() {
        // given
        Car car = createCar();
        memberCarRepository.save(new MemberCar(member, car));

        // when
        MemberCar memberCar = memberService.findMemberCar(member.getId());

        // then
        assertThat(memberCar.getCar()).usingRecursiveComparison().isEqualTo(car);
    }

    @Test
    void 회원이_차량을_등록한다() {
        // given
        Car car = carRepository.save(createCar());

        // when
        Car savedCar = memberService.addMemberCar(member.getId(), member.getId(), new CarRequest(car.getName(), car.getVintage()));

        // then
        assertThat(savedCar.getName()).isEqualTo("아이오닉5");
    }

    @Test
    void 회원이_없는_차량을_등록하면_예외를_발생한다() {
        // when & then
        assertThatThrownBy(() -> memberService.addMemberCar(member.getId(), member.getId(), new CarRequest("G바겐", "2022")))
                .isInstanceOf(CarException.class)
                .hasMessage(CarExceptionType.NOT_FOUND_EXCEPTION.message());
    }
}
