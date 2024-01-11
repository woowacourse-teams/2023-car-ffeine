package com.carffeine.carffeine.car.integration;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarFilter;
import com.carffeine.carffeine.car.domain.CarFilterRepository;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.infrastructure.repository.dto.CarsResponse;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.fixture.car.CarFixture.createCar;
import static com.carffeine.carffeine.fixture.filter.FilterFixture.createCapacityFilter;
import static com.carffeine.carffeine.fixture.filter.FilterFixture.createCompanyFilter;
import static com.carffeine.carffeine.fixture.filter.FilterFixture.createConnectorTypeFilter;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CarIntegrationTest extends CarIntegrationFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private TokenProvider provider;

    @Autowired
    private FilterRepository filterRepository;

    @Autowired
    private CarFilterRepository carFilterRepository;

    private Member 관리자;
    private String 관리자_토큰;
    private Car 저장된_차량;
    private CarsRequest 차량_저장_리스트;
    private List<Filter> 저장된_필터;
    private FiltersRequest 필터_요청_리스트;

    @BeforeEach
    void setup() {
        관리자 = memberRepository.save(Member.builder()
                .name("admin")
                .email("admin@email.com")
                .memberRole(MemberRole.ADMIN)
                .build());

        관리자_토큰 = "Bearer " + provider.create(관리자.getId());

        저장된_차량 = carRepository.save(createCar());

        차량_저장_리스트 = new CarsRequest(
                List.of(new CarRequest("아이오닉6", "2022-A"))
        );

        저장된_필터 = filterRepository.saveAll(List.of(createCompanyFilter(), createConnectorTypeFilter(), createCapacityFilter()));
        carFilterRepository.saveAll(List.of(new CarFilter(저장된_차량, 저장된_필터.get(0))));

        필터_요청_리스트 = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "HG"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00")
                )
        );
    }

    @Test
    void 차량을_생성한다() {
        // when
        var 차량_생성_응답 = 생성_요청("/cars", 차량_저장_리스트, 관리자_토큰);
        var 차량_생성_결과 = 차량_생성_응답.body().as(CarsResponse.class);

        // then
        단일_검증(차량_생성_결과.cars().size(), 2);
    }

    @Test
    void 차량을_모두_조회한다() {
        // when
        var 차량_조회_응답 = 조회_요청("/cars");
        var 차량_조회_결과 = 차량_조회_응답.body().as(CarsResponse.class);

        // then
        단일_검증(차량_조회_결과.cars().size(), 1);
    }

    @Test
    void 차량을_제거한다() {
        // when
        제거_요청("/cars/1", 관리자_토큰);

        // then
        List<Car> 차량_리스트 = carRepository.findAll();
        단일_검증(차량_리스트.size(), 0);
    }

    @Test
    void 차량에_적용된_필터를_찾는다() {
        // when
        var 차량_필터_조회_요청_응답 = 조회_요청("/cars/1/filters");
        var 차량_필터_조회_요청_결과 = 차량_필터_조회_요청_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(차량_필터_조회_요청_결과.companies().get(0), 저장된_필터.get(0).getName());
    }

    @Test
    void 차량에_필터를_적용한다() {
        // when
        var 차량_필터_생성_응답 = 생성_요청("/cars/1/filters", 필터_요청_리스트, 관리자_토큰);
        var 차량_필터_생성_결과 = 차량_필터_생성_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(차량_필터_생성_결과.companies().get(0), 저장된_필터.get(0).getName());
        단일_검증(차량_필터_생성_결과.capacities().get(0), 저장된_필터.get(2).getName());
    }
}
