package com.carffeine.carffeine.filter.integration;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
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

import java.util.Collections;
import java.util.List;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class FilterIntegrationTest extends FilterIntegrationFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TokenProvider provider;

    private FiltersRequest 필터_리스트;
    private FiltersRequest 충전_속도_필터_리스트;
    private Member 관리자;
    private String 관리자_토큰;

    @BeforeEach
    void setup() {
        관리자 = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());
        관리자_토큰 = "Bearer " + provider.create(관리자.getId());

        필터_리스트 = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "광주시"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        충전_속도_필터_리스트 = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00")
                )
        );

        생성요청("/filters", 필터_리스트, 관리자_토큰);
    }

    @Test
    void 모든_필터를_조회한다() {
        // when
        var 필터_조회_응답 = 모든_필터를_조회한다("/filters");
        var 필터_조회_결과 = 필터_조회_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(필터_조회_결과.companies().get(0), "광주시");
        단일_검증(필터_조회_결과.connectorTypes().get(0), "DC_COMBO");
    }

    @Test
    void 필터를_등록한다() {
        // when
        var 필터_생성_응답 = 생성요청("/filters", 충전_속도_필터_리스트, 관리자_토큰);
        var 필터_생성_결과 = 필터_생성_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(필터_생성_결과.capacities().get(0), "2.00");
    }

    @Test
    void 필터를_제거한다() {
        // when
        제거요청("/filters/2.00", 관리자_토큰);

        // then
        var 필터_조회_응답 = 모든_필터를_조회한다("/filters");
        var 필터_조회_결과 = 필터_조회_응답.body().as(FiltersResponse.class);

        단일_검증(필터_조회_결과.capacities(), Collections.emptyList());
    }
}
