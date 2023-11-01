package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
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
    @Autowired
    private MemberRepository memberRepository;

    private Member member;

    @BeforeEach
    void setUp() {
        member = memberRepository.save(Member.builder()
                .name("user")
                .email("user@email.com")
                .memberRole(MemberRole.USER)
                .build());
        stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속);
    }

    @Test
    void 잘못된_정보_신고를_저장한다() {
        // given
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .station(선릉역_충전소_충전기_2개_사용가능_1개_완속)
                .member(member)
                .build();

        // when
        MisinformationReport result = misinformationReportRepository.save(misinformationReport);

        // then
        assertThat(result.getId()).isNotNull();
    }

    @Test
    void 잘못된_정보와_상세_수정_정보_신고를_저장한다() {
        // given
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .station(선릉역_충전소_충전기_2개_사용가능_1개_완속)
                .misinformationDetailReports(List.of(
                        MisinformationDetailReport.builder()
                                .category("address")
                                .content("부산시 시민공원로 11")
                                .build(),
                        MisinformationDetailReport.builder()
                                .category("contact")
                                .content("010-1001-1010")
                                .build()))
                .member(member)
                .build();

        // when
        MisinformationReport result = misinformationReportRepository.save(misinformationReport);

        // then
        assertThat(result.getId()).isNotNull();
    }

    @Test
    void 잘못된_정보를_페이지로_조회한다() {
        // given
        MisinformationReport misinformationReport = MisinformationReport.builder()
                .station(선릉역_충전소_충전기_2개_사용가능_1개_완속)
                .misinformationDetailReports(List.of(
                        MisinformationDetailReport.builder()
                                .category("address")
                                .content("부산시 시민공원로 11")
                                .build(),
                        MisinformationDetailReport.builder()
                                .category("contact")
                                .content("010-1001-1010")
                                .build()))
                .member(member)
                .build();
        misinformationReportRepository.save(misinformationReport);
        MisinformationReport misinformationReport1 = MisinformationReport.builder()
                .station(선릉역_충전소_충전기_2개_사용가능_1개_완속)
                .member(member)
                .build();
        misinformationReportRepository.save(misinformationReport1);

        // when
        Page<MisinformationReport> result = misinformationReportRepository.findAll(Pageable.ofSize(1));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.getTotalPages()).isEqualTo(2);
            softly.assertThat(result.getContent()).containsExactly(misinformationReport);
            softly.assertThat(result.getContent().get(0).getMisinformationDetailReports()).hasSize(2);
        });
    }
}
