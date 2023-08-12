package com.carffeine.carffeine.member.integration;

import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.filter.controller.dto.FiltersResponse;
import com.carffeine.carffeine.filter.domain.FilterRepository;
import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.service.dto.FilterRequest;
import com.carffeine.carffeine.filter.service.dto.FiltersRequest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberFilterRepository;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class MemberFilterIntegrationTest extends MemberFilterIntegrationFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FilterRepository filterRepository;

    @Autowired
    private MemberFilterRepository memberFilterRepository;

    @Autowired
    private TokenProvider provider;

    private FiltersRequest 필터_리스트;
    private FiltersRequest 충전_속도_필터_리스트;
    private Member 관리자;
    private String 관리자_토큰;
    private Member 일반_유저;
    private String 유저_토큰;

    @BeforeEach
    void setup() {
        일반_유저 = memberRepository.save(Member.builder()
                .id(1L)
                .memberRole(MemberRole.USER)
                .build());
        유저_토큰 = "Bearer " + provider.create(일반_유저.getId());

        관리자 = memberRepository.save(Member.builder()
                .id(2L)
                .memberRole(MemberRole.ADMIN)
                .build());
        관리자_토큰 = "Bearer " + provider.create(관리자.getId());

        필터_리스트 = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.COMPANY.getName(), "광주시"),
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00"),
                        new FilterRequest(FilterType.CONNECTOR_TYPE.getName(), "DC_COMBO")
                )
        );

        생성_요청("/filters", 필터_리스트, 관리자_토큰);

        충전_속도_필터_리스트 = new FiltersRequest(
                List.of(
                        new FilterRequest(FilterType.CAPACITY.getName(), "2.00")
                )
        );
    }

    @Test
    void 유저의_모든_필터를_조회한다() {
        // when
        var 모든_필터_조회_응답 = 모든_필터_조회_요청("/members/" + 일반_유저.getId() + "/filters", 유저_토큰);
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
}
