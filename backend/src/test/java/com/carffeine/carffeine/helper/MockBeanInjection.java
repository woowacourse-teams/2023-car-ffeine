package com.carffeine.carffeine.helper;

import com.carffeine.carffeine.admin.service.AdminService;
import com.carffeine.carffeine.auth.controller.AuthMemberResolver;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.service.AuthService;
import com.carffeine.carffeine.auth.service.OAuthRequester;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.service.congestion.CongestionService;
import com.carffeine.carffeine.station.service.report.ReportService;
import com.carffeine.carffeine.station.service.review.ReviewService;
import com.carffeine.carffeine.station.service.station.StationService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@MockBean(JpaMetamodelMappingContext.class)
public class MockBeanInjection {

    @MockBean
    protected ReportService reportService;
    @MockBean
    protected AuthMemberResolver authMemberResolver;
    @MockBean
    protected TokenProvider tokenProvider;
    @MockBean
    protected StationService stationService;
    @MockBean
    protected MemberRepository memberRepository;
    @MockBean
    protected AuthService authService;
    @MockBean
    protected CongestionService congestionService;
    @MockBean
    protected OAuthRequester oAuthRequester;
    @MockBean
    protected AdminService adminService;
    @MockBean
    protected ReviewService reviewService;
    @MockBean
    protected ReviewRepository repository;
}
