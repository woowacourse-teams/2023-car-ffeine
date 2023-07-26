package com.carffeine.carffeine.station.service.report;

import com.carffeine.carffeine.station.domain.report.FakeFaultRepository;
import com.carffeine.carffeine.station.domain.report.FaultReport;
import com.carffeine.carffeine.station.domain.report.FaultReportRepository;
import com.carffeine.carffeine.station.domain.station.FakeStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.exception.report.ReportException;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReportServiceTest {

    private ReportService reportService;
    private StationRepository stationRepository;
    private FaultReportRepository faultReportRepository;

    @BeforeEach
    void setUp() {
        stationRepository = new FakeStationRepository();
        faultReportRepository = new FakeFaultRepository();
        reportService = new ReportService(faultReportRepository, stationRepository);
    }

    @Test
    void 신고를_저장한다() {
        // given
        Station station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        Long memberId = 123L;

        // when
        FaultReport faultReport = reportService.saveFaultReport(station.getStationId(), memberId);

        // then
        List<FaultReport> faultReports = faultReportRepository.findByStation(station);
        assertThat(faultReports).contains(faultReport);
    }

    @Test
    void 같은_회원이_이미_신고한_충전소를_신고하면_예외가_발생한다() {
        // given
        Station station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        Long memberId = 123L;
        reportService.saveFaultReport(station.getStationId(), memberId);

        // when && then
        assertThatThrownBy(() -> reportService.saveFaultReport(station.getStationId(), memberId))
                .isInstanceOf(ReportException.class)
                .hasMessage("이미 신고한 충전소는 신고가 불가합니다");
    }
}
