package com.carffeine.carffeine.station;

import com.carffeine.carffeine.member.controller.AuthMemberResolver;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.infrastructure.JWTProvider;
import com.carffeine.carffeine.member.service.MemberService;
import com.carffeine.carffeine.station.service.congestion.CongestionService;
import com.carffeine.carffeine.station.service.report.ReportService;
import com.carffeine.carffeine.station.service.station.StationService;
import org.springframework.boot.test.mock.mockito.MockBean;

public class MockBeanInjection {

    @MockBean
    protected ReportService reportService;
    @MockBean
    protected AuthMemberResolver authMemberResolver;
    @MockBean
    protected JWTProvider tokenProvider;
    @MockBean
    protected StationService stationService;
    @MockBean
    protected MemberRepository memberRepository;
    @MockBean
    protected MemberService memberService;
    @MockBean
    protected CongestionService congestionService;
}
