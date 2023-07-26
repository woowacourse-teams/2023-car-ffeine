package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class FaultReportRepositoryTest {

    @Autowired
    private FaultReportRepository faultReportRepository;

    @Autowired
    private StationRepository stationRepository;
    private Station station;

    @BeforeEach
    void setUp() {
        station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
    }

    @Test
    void 고장_신고를_저장한다() {
        // given
        FaultReport faultReport = FaultReport.builder()
                .station(station)
                .memberId(123L)
                .build();

        // when
        FaultReport saved = faultReportRepository.save(faultReport);

        // then
        assertThat(saved.getId()).isNotNull();
    }

    @Test
    void 충전소와_회원_id_고장신고가_있으면_true를_반환한다() {
        // given
        FaultReport faultReport = FaultReport.builder()
                .station(station)
                .memberId(123L)
                .build();
        faultReportRepository.save(faultReport);

        // when
        boolean result = faultReportRepository.existsByStationAndMemberId(station, 123L);

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 충전소와_회원_id_고장신고가_없으면_false를_반환한다() {
        // given
        FaultReport faultReport = FaultReport.builder()
                .station(station)
                .memberId(123L)
                .build();
        faultReportRepository.save(faultReport);

        // when
        boolean result = faultReportRepository.existsByStationAndMemberId(station, 1L);

        // then
        assertThat(result).isFalse();
    }
}
