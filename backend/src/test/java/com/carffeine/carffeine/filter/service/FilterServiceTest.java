package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilterRepository;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.fake.FakeCarFilterRepository;
import com.carffeine.carffeine.car.fake.FakeCarRepository;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.fake.FakeFilterRepository;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.carffeine.carffeine.car.fixture.CarFixture.createCar;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class FilterServiceTest {

    private FilterService filterService;
    private FilterRepository filterRepository;
    private MemberRepository memberRepository;
    private CarRepository carRepository;
    private CarFilterRepository carFilterRepository;

    private Member admin;
    private Member member;

    @BeforeEach
    void setup() {
        filterRepository = new FakeFilterRepository();
        memberRepository = new FakeMemberRepository();
        carRepository = new FakeCarRepository();
        carFilterRepository = new FakeCarFilterRepository();
        filterService = new FilterService(filterRepository, memberRepository, carRepository, carFilterRepository);

        admin = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());

        member = memberRepository.save(Member.builder()
                .memberRole(MemberRole.USER)
                .build());
    }

    @Test
    void 필터를_모두_조회한다() {
        // given
        String filterName = "충전소명";

        // when
        filterRepository.saveAll(List.of(Filter.of(filterName, FilterType.COMPANY.getName())));
        List<Filter> filters = filterService.findAllFilters();

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
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "충전소 회사"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        // when
        filterService.addFilters(admin.getId(), filtersRequest);

        // then
        List<Filter> filters = filterService.findAllFilters();
        assertThat(filters).hasSize(3);
    }

    @Test
    void 필터를_제거한다() {
        // given
        FiltersRequest filtersRequest = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "충전소 회사"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        filterService.addFilters(admin.getId(), filtersRequest);

        // when
        filterService.deleteFilterByName(admin.getId(), "충전소 회사");

        // then
        List<Filter> filters = filterService.findAllFilters();
        assertThat(filters).hasSize(2);
    }

    @Test
    void 차량에_필터를_적용한다() {
        // given
        Car savedCar = carRepository.save(createCar());
        filterRepository.saveAll(List.of(new Filter("HG", FilterType.COMPANY)));
        String filterName = "HG";
        FiltersRequest request = new FiltersRequest(
                List.of(new FilterRequest(FilterType.COMPANY.getName(), filterName))
        );

        // when
        List<Filter> result = filterService.addCarFilters(admin.getId(), savedCar.getId(), request);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(result.get(0).getName()).isEqualTo(filterName);
        });
    }

    @Test
    void 어드민이_아니면_차량에_필터를_적용하지_못한다() {
        // given
        Car savedCar = carRepository.save(createCar());
        FiltersRequest request = new FiltersRequest(
                List.of(new FilterRequest(FilterType.COMPANY.getName(), "HG"))
        );

        // when & then
        assertThatThrownBy(() -> filterService.addCarFilters(member.getId(), savedCar.getId(), request))
                .isInstanceOf(AdminException.class)
                .hasMessage(AdminExceptionType.NOT_ADMIN.message());
    }
}
