package com.carffeine.carffeine.car.integration;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.car.controller.dto.CarsResponse;
import com.carffeine.carffeine.car.domain.Car;
import com.carffeine.carffeine.car.domain.CarRepository;
import com.carffeine.carffeine.car.service.dto.CarRequest;
import com.carffeine.carffeine.car.service.dto.CarsRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.car.fixture.CarFixture.createCar;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class CarIntegrationTest extends CarIntegrationFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private TokenProvider provider;

    private Member 관리자;
    private String 관리자_토큰;
    private Car 저장된_차량;
    private CarsRequest 차량_저장_리스트;

    @BeforeEach
    void setup() {
        관리자 = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());

        관리자_토큰 = "Bearer " + provider.create(관리자.getId());

        저장된_차량 = carRepository.save(createCar());

        차량_저장_리스트 = new CarsRequest(
                List.of(new CarRequest("아이오닉6", "2022-A"))
        );
    }

    @Test
    void 차량을_생성한다() {
        // when
        var 차량_생성_응답 = 차량_생성_요청("/cars", 차량_저장_리스트, 관리자_토큰);
        var 차량_생성_결과 = 차량_생성_응답.body().as(CarsResponse.class);

        // then
        단일_검증(차량_생성_결과.cars().size(), 2);
    }

    @Test
    void 차량을_모두_조회한다() {
        // when
        var 차량_조회_응답 = 차량_조회_요청("/cars");
        var 차량_조회_결과 = 차량_조회_응답.body().as(CarsResponse.class);

        // then
        단일_검증(차량_조회_결과.cars().size(), 1);
    }

    @Test
    void 차량을_제거한다() {
        // when
        var 차량_제거 = 차량_제거_요청("/cars/1", 관리자_토큰);

        // then
        List<Car> 차량_리스트 = carRepository.findAll();
        단일_검증(차량_리스트.size(), 0);
    }
}
