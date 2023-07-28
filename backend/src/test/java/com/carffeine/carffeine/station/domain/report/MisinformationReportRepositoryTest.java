package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
public class MisinformationReportRepositoryTest {

    @Autowired
    private MisinformationReportRepository misinformationReportRepository;

    @Autowired
    private StationRepository stationRepository;

    @BeforeEach
    void setUp() {
        stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속);
    }

    @Test
    void 잘못된_정보_신고를_저장한다() {
        // given
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .station(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속)
                .memberId(123L)
                .build();

        // when
        MisinformationReport result = misinformationReportRepository.save(misinformationReport);

        // then
        assertThat(result.getId()).isNotNull();
    }

    @Test
    void 잘못된_정보와_상세_수정_정보_신고를_저장한다() {
        // given
        MisinformationDetailReport detailReport = MisinformationDetailReport.builder()
                .category("address")
                .content("부산시 시민공원로 11")
                .build();
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .station(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속)
                .misinformationDetailReports(List.of(detailReport))
                .memberId(123L)
                .build();

        // when
        MisinformationReport result = misinformationReportRepository.save(misinformationReport);

        // then
        List<MisinformationDetailReport> misinformationDetailReports = result.getMisinformationDetailReports();
        assertSoftly(softly -> {
            softly.assertThat(result.getId()).isNotNull();
            softly.assertThat(misinformationDetailReports.get(0).getId()).isNotNull();
        });
    }
}
