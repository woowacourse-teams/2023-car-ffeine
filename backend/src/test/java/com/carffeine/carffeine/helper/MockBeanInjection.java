package com.carffeine.carffeine.helper;

import com.carffeine.carffeine.admin.service.AdminMemberService;
import com.carffeine.carffeine.admin.service.AdminReportService;
import com.carffeine.carffeine.admin.service.AdminStationService;
import com.carffeine.carffeine.auth.controller.AuthArgumentResolver;
import com.carffeine.carffeine.auth.controller.support.AuthenticationContext;
import com.carffeine.carffeine.auth.domain.TokenProvider;
import com.carffeine.carffeine.auth.service.AuthService;
import com.carffeine.carffeine.auth.service.OAuthRequester;
import com.carffeine.carffeine.car.service.CarQueryService;
import com.carffeine.carffeine.car.service.CarService;
import com.carffeine.carffeine.filter.service.FilterQueryService;
import com.carffeine.carffeine.filter.service.FilterService;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.service.congestion.CongestionService;
import com.carffeine.carffeine.station.service.report.ReportService;
import com.carffeine.carffeine.station.service.review.ReplyService;
import com.carffeine.carffeine.station.service.review.ReviewService;
import com.carffeine.carffeine.station.service.station.StationService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

@MockBean(JpaMetamodelMappingContext.class)
public class MockBeanInjection {

    @MockBean
    protected ReportService reportService;
    @MockBean
    protected AuthArgumentResolver authArgumentResolver;
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
    protected AdminStationService adminStationService;
    @MockBean
    protected AdminReportService adminReportService;
    @MockBean
    protected ReviewService reviewService;
    @MockBean
    protected ReviewRepository reviewRepository;
    @MockBean
    protected AdminMemberService adminMemberService;
    @MockBean
    protected FilterService filterService;
    @MockBean
    protected ReplyService replyService;
    @MockBean
    protected ReplyRepository replyRepository;
    @MockBean
    protected CarService carService;
    @MockBean
    protected AuthenticationContext authenticationContext;
    @MockBean
    protected CarQueryService carQueryService;
    @MockBean
    protected FilterQueryService filterQueryService;
}
