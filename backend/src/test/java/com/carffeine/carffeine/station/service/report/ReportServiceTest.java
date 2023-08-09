package com.carffeine.carffeine.station.service.report;

import com.carffeine.carffeine.fake.member.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.fixture.MemberFixture;
import com.carffeine.carffeine.station.domain.report.FakeFaultRepository;
import com.carffeine.carffeine.station.domain.report.FakeMisinformationRepository;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.report.FaultReportRepository;
import com.carffeine.carffeine.station.domain.report.MisinformationReport;
import com.carffeine.carffeine.station.domain.report.MisinformationReportRepository;
import com.carffeine.carffeine.station.domain.station.FakeStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.report.ReportException;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import com.carffeine.carffeine.station.service.report.dto.MisinformationReportRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.carffeine.carffeine.station.service.report.dto.MisinformationReportRequest.StationDetailToUpdate;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReportServiceTest {

    private ReportService reportService;
    private StationRepository stationRepository;
    private FaultReportRepository faultReportRepository;
    private MemberRepository memberRepository;
    private MisinformationReportRepository misinformationReportRepository;

    @BeforeEach
    void setUp() {
        misinformationReportRepository = new FakeMisinformationRepository();
        stationRepository = new FakeStationRepository();
        faultReportRepository = new FakeFaultRepository();
        memberRepository = new FakeMemberRepository();
        reportService = new ReportService(faultReportRepository, stationRepository, memberRepository, misinformationReportRepository);
    }

    @Test
    void 신고를_저장한다() {
        // given
        Station station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        Member member = memberRepository.save(MemberFixture.일반_회원);

        // when
        FaultReport faultReport = reportService.saveFaultReport(station.getStationId(), member.getId());

        // then
        List<FaultReport> faultReports = faultReportRepository.findByStation(station);
        assertThat(faultReports).contains(faultReport);
    }

    @Test
    void 같은_회원이_이미_신고한_충전소를_신고하면_예외가_발생한다() {
        // given
        Station station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        Member member = memberRepository.save(MemberFixture.일반_회원);
        reportService.saveFaultReport(station.getStationId(), member.getId());

        // when && then
        assertThatThrownBy(() -> reportService.saveFaultReport(station.getStationId(), member.getId()))
                .isInstanceOf(ReportException.class)
                .hasMessage("이미 신고한 충전소는 신고가 불가합니다");
    }

    @Test
    void 충전소의_잘못된_정보를_제보한다() {
        // given
        Station station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        Member member = memberRepository.save(MemberFixture.일반_회원);
        StationDetailToUpdate detail = new StationDetailToUpdate("address", "부산");
        MisinformationReportRequest request = new MisinformationReportRequest(List.of(detail));

        // when
        MisinformationReport misinformationReport = reportService.saveMisinformationReport(station.getStationId(), member.getId(), request);

        // then
        assertSoftly(softly -> {
            softly.assertThat(misinformationReport.getId()).isEqualTo(1L);
            softly.assertThat(misinformationReport.getMember().getId()).isEqualTo(member.getId());
            softly.assertThat(misinformationReport.isChecked()).isEqualTo(false);
            softly.assertThat(misinformationReport.getMisinformationDetailReports()).hasSize(1);
        });
    }

    @Test
    void 같은_회원이_신고를_했으면_true를_반환한다() {
        // given
        Station station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        Member member = memberRepository.save(MemberFixture.일반_회원);
        reportService.saveFaultReport(station.getStationId(), member.getId());

        // when
        boolean result = reportService.isDuplicateReportStation(member.getId(), station.getStationId());

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 같은_회원이_신고를_하지_않았다면_false를_반환한다() {
        // given
        Station station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        Member member = memberRepository.save(MemberFixture.일반_회원);
        reportService.saveFaultReport(station.getStationId(), member.getId());
        Long newMemberId = 1000L;

        // when
        boolean result = reportService.isDuplicateReportStation(newMemberId, station.getStationId());

        // then
        assertThat(result).isFalse();
    }
}
