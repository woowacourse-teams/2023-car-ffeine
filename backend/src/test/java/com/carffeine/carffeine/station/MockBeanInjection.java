package com.carffeine.carffeine.station;

import com.carffeine.carffeine.station.domain.jwt.JwtProvider;
import com.carffeine.carffeine.station.domain.member.MemberRepository;
import com.carffeine.carffeine.station.infrastructure.api.AuthMemberResolver;
import com.carffeine.carffeine.station.service.auth.MemberService;
import com.carffeine.carffeine.station.service.congestion.CongestionService;
import com.carffeine.carffeine.station.service.station.StationService;
import org.springframework.boot.test.mock.mockito.MockBean;

public class MockBeanInjection {

    @MockBean
    protected AuthMemberResolver authMemberResolver;
    @MockBean
    protected JwtProvider jwtProvider;
    @MockBean
    protected StationService stationService;
    @MockBean
    protected MemberRepository memberRepository;
    @MockBean
    protected MemberService memberService;
    @MockBean
    protected CongestionService congestionService;
}
