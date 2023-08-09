package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.fake.member.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.report.FakeMisinformationRepository;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.data.domain.PageRequest.of;

public class AdminReportServiceTest {

    private MisinformationReportRepository misinformationReportRepository;
    private MemberRepository memberRepository;
    private AdminReportService adminReportService;
    private Member admin;
    private Member user;

    @BeforeEach
    void setUp() {
        memberRepository = new FakeMemberRepository();
        misinformationReportRepository = new FakeMisinformationRepository();
        adminReportService = new AdminReportService(memberRepository, misinformationReportRepository);

        admin = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());
        user = memberRepository.save(Member.builder()
                .memberRole(MemberRole.USER)
                .build());
    }

    @Test
    void 충전소의_모든_정보를_요청한_갯수만큼_가져온다() {
        // given
        for (int i = 0; i < 30; i++) {
            misinformationReportRepository.save(MisinformationReport.builder()
                    .id((long) i)
                    .build());
        }

        // when
        Page<MisinformationReport> reportPage = adminReportService.getMisinformationReports(of(0, 10), admin.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(reportPage.getNumberOfElements()).isEqualTo(10);
            softly.assertThat(reportPage.getTotalPages()).isEqualTo(3);
        });
    }
}
