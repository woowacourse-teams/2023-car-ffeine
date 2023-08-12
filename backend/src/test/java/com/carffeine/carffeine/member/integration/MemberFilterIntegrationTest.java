package com.carffeine.carffeine.member.integration;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.car.controller.dto.CarResponse;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.controller.dto.MemberCarInfoResponse;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberCar;
import com.carffeine.carffeine.member.domain.MemberCarRepository;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.car.fixture.CarFixture.createCar;
import static com.carffeine.carffeine.car.fixture.CarFixture.createOtherCar;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class MemberFilterIntegrationTest extends MemberFilterIntegrationFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FilterRepository filterRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private MemberCarRepository memberCarRepository;

    @Autowired
    private TokenProvider provider;

    private FiltersRequest 충전_속도_필터_리스트;
    private Member 일반_유저;
    private String 유저_토큰;
    private Car 존재하는_자동차;
    private Car 존재하는_자동차2;

    @BeforeEach
    void setup() {
        일반_유저 = memberRepository.save(Member.builder()
                .id(1L)
                .memberRole(MemberRole.USER)
                .build());
        유저_토큰 = "Bearer " + provider.create(일반_유저.getId());

        filterRepository.saveAll(List.of(
                Filter.of("광주시", FilterType.COMPANY.getName()),
                Filter.of("2.00", FilterType.CAPACITY.getName()),
                Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName())
        ));

        충전_속도_필터_리스트 = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00")
                )
        );

        존재하는_자동차 = carRepository.save(createCar());
        존재하는_자동차2 = carRepository.save(createOtherCar());

        memberCarRepository.save(new MemberCar(일반_유저, 존재하는_자동차));
    }

    @Test
    void 유저의_모든_필터를_조회한다() {
        // when
        var 모든_필터_조회_응답 = 조회_요청("/members/" + 일반_유저.getId() + "/filters", 유저_토큰);
        var 필터_조회_결과 = 모든_필터_조회_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(필터_조회_결과.companies().size(), 0);
    }

    @Test
    void 유저의_필터를_새로_저장한다() {
        // when
        var 생성_요청_응답 = 생성_요청("/members/" + 일반_유저.getId() + "/filters", 충전_속도_필터_리스트, 유저_토큰);
        var 생성_요청_결과 = 생성_요청_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(생성_요청_결과.companies().size(), 0);
    }

    @Test
    void 유저가_등록한_차량을_조회한다() {
        // when
        var 유저_차량_조회_응답 = 조회_요청("/members/me", 유저_토큰);
        var 유저_차량_조회_결과 = 유저_차량_조회_응답.body().as(MemberCarInfoResponse.class);

        // then
        단일_검증(유저_차량_조회_결과.car().name(), 존재하는_자동차.getName());
    }

    @Test
    void 유저가_차량을_등록한다() {
        // when
        var 유저_차량_생성_응답 = 생성_요청("/members/" + 일반_유저.getId() + "/cars", 존재하는_자동차2, 유저_토큰);
        var 유저_차량_생성_결과 = 유저_차량_생성_응답.body().as(CarResponse.class);

        // then
        단일_검증(유저_차량_생성_결과.name(), 존재하는_자동차2.getName());
    }
}
