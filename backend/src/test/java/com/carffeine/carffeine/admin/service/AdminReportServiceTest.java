package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.fake.member.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.report.FakeFaultReportRepository;
import com.carffeine.carffeine.station.domain.report.FakeMisinformationRepository;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.report.FaultReportRepository;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReportRepository;
import com.carffeine.carffeine.station.fixture.report.MisinformationReportFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.data.domain.PageRequest.of;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class AdminReportServiceTest {

    private MisinformationReportRepository misinformationReportRepository;
    private MemberRepository memberRepository;
    private AdminReportService adminReportService;
    private FaultReportRepository faultReportRepository;
    private Member admin;
    private Member user;

    @BeforeEach
    void setUp() {
        memberRepository = new FakeMemberRepository();
        faultReportRepository = new FakeFaultReportRepository();
        misinformationReportRepository = new FakeMisinformationRepository();
        adminReportService = new AdminReportService(memberRepository, misinformationReportRepository, faultReportRepository);

        admin = memberRepository.save(Member.builder()
                .memberRole(MemberRole.ADMIN)
                .build());
        user = memberRepository.save(Member.builder()
                .memberRole(MemberRole.USER)
                .build());
    }

    @Test
    void 충전소의_모든_제보를_요청한_갯수만큼_가져온다() {
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

    @Test
    void 충전소_제보를_상세_조회한다() {
        // given
        MisinformationReport report = misinformationReportRepository.save(MisinformationReportFixture.선릉역_상세정보가_포함된_잘못된_정보_제보);

        // when
        MisinformationReport misinformationDetail = adminReportService.getMisinformationDetail(report.getId(), admin.getId());

        // then
        assertThat(misinformationDetail).usingRecursiveComparison()
                .isEqualTo(report);
    }

    @Test
    void 충전소_제보를_조회할_때_관리자가_아니라면_예외가_발생한다() {
        // given
        MisinformationReport report = misinformationReportRepository.save(MisinformationReportFixture.선릉역_상세정보가_포함된_잘못된_정보_제보);

        // when & then
        assertThatThrownBy(() -> adminReportService.getMisinformationDetail(report.getId(), user.getId()))
                .isInstanceOf(AdminException.class)
                .hasMessage(AdminExceptionType.NOT_ADMIN.message());
    }

    @Test
    void 충전소의_모든_신고를_요청한_갯수만큼_가져온다() {
        // given
        for (int i = 0; i < 30; i++) {
            faultReportRepository.save(FaultReport.builder()
                    .id((long) i)
                    .build());
        }

        // when
        Page<FaultReport> faultPage = adminReportService.getFaultReports(of(0, 10), admin.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(faultPage.getNumberOfElements()).isEqualTo(10);
            softly.assertThat(faultPage.getTotalPages()).isEqualTo(3);
        });
    }
}
