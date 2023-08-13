package com.carffeine.carffeine.car.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilter;
import com.carffeine.carffeine.car.domain.CarFilterRepository;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.fake.FakeCarFilterRepository;
import com.carffeine.carffeine.car.fake.FakeCarRepository;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
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
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createCapacityFilter;
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createCompanyFilter;
import static com.carffeine.carffeine.filter.fixture.FilterFixture.createConnectorTypeFilter;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CarServiceTest {

    private CarService carService;
    private MemberRepository memberRepository;
    private CarRepository carRepository;
    private CarFilterRepository carFilterRepository;
    private FilterRepository filterRepository;

    private Member member;
    private Member admin;

    @BeforeEach
    void setup() {
        memberRepository = new FakeMemberRepository();
        carRepository = new FakeCarRepository();
        carFilterRepository = new FakeCarFilterRepository();
        filterRepository = new FakeFilterRepository();
        carService = new CarService(
                memberRepository,
                carRepository,
                carFilterRepository,
                filterRepository
        );

        member = memberRepository.save(Member.builder()
                .id(1L)
                .memberRole(MemberRole.USER)
                .build());

        admin = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());

        filterRepository.saveAll(
                List.of(createCompanyFilter(), createConnectorTypeFilter(), createCapacityFilter())
        );
    }

    @Test
    void 차량을_모두_조회한다() {
        // given
        Car savedCar = carRepository.save(createCar());

        // when
        List<Car> result = carService.findAllCars();

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(1);
            softly.assertThat(savedCar).usingRecursiveComparison().isEqualTo(result.get(0));
        });
    }

    @Test
    void 차량을_저장한다() {
        // given
        CarsRequest request = new CarsRequest(
                List.of(
                        new CarRequest("아이오닉5", "2022-A"),
                        new CarRequest("아이오닉5", "2022-B")
                )
        );

        // when
        List<Car> result = carService.saveCars(admin.getId(), request);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.size()).isEqualTo(2);
            softly.assertThat(result.get(0).getVintage()).isEqualTo("2022-A");
            softly.assertThat(result.get(1).getVintage()).isEqualTo("2022-B");
        });
    }

    @Test
    void 저장하려는_차량이_중복이면_제외하고_저장한다() {
        // given
        carRepository.save(Car.from("아이오닉5", "2022-A"));

        CarsRequest request = new CarsRequest(
                List.of(
                        new CarRequest("아이오닉5", "2022-A"),
                        new CarRequest("아이오닉5", "2022-B")
                )
        );

        // when
        List<Car> result = carService.saveCars(admin.getId(), request);

        // then
        assertThat(result.size()).isEqualTo(1);
    }

    @Test
    void 어드민이_아니면_차량을_저장하지_못한다() {
        // given
        CarsRequest request = new CarsRequest(
                List.of(
                        new CarRequest("아이오닉5", "2022-A"),
                        new CarRequest("아이오닉5", "2022-B")
                )
        );

        // when & then
        assertThatThrownBy(() -> carService.saveCars(member.getId(), request))
                .isInstanceOf(AdminException.class)
                .hasMessage(AdminExceptionType.NOT_ADMIN.message());
    }

    @Test
    void 차량을_삭제한다() {
        // given
        Car savedCar = carRepository.save(createCar());
        int beforeSize = carRepository.findAll().size();

        // when
        carService.deleteCar(admin.getId(), savedCar.getId());

        // then
        int afterSize = carRepository.findAll().size();
        assertThat(afterSize).isEqualTo(beforeSize - 1);
    }

    @Test
    void 차량에_저장된_필터를_모두_조회한다() {
        // given
        Car savedCar = carRepository.save(createCar());
        List<CarFilter> carFilters = carFilterRepository.saveAll(List.of(new CarFilter(savedCar, createCompanyFilter())));

        // when
        List<Filter> result = carService.findCarFilters(savedCar.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(carFilters.size()).isEqualTo(result.size());
            softly.assertThat(carFilters.get(0).getFilter().equals(result.get(0))).isTrue();
        });
    }

    @Test
    void 차량에_필터를_적용한다() {
        // given
        Car savedCar = carRepository.save(createCar());
        String filterName = "HG";
        FiltersRequest request = new FiltersRequest(
                List.of(new FilterRequest(FilterType.COMPANY.getName(), filterName))
        );

        // when
        List<Filter> result = carService.addCarFilters(admin.getId(), savedCar.getId(), request);

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
        assertThatThrownBy(() -> carService.addCarFilters(member.getId(), savedCar.getId(), request))
                .isInstanceOf(AdminException.class)
                .hasMessage(AdminExceptionType.NOT_ADMIN.message());
    }
}
