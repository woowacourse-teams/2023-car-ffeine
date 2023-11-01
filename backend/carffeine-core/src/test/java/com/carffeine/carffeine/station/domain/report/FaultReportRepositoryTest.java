package com.carffeine.carffeine.station.domain.report;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.station.Station;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class FaultReportRepositoryTest {

    @Autowired
    private FaultReportRepository faultReportRepository;

    @Autowired
    private StationRepository stationRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Station station;
    private Member member;
    private Member otherMember;

    @BeforeEach
    void setUp() {
        station = stationRepository.save(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);
        member = memberRepository.save(Member.builder()
                .name("user")
                .email("user@email.com")
                .memberRole(MemberRole.USER)
                .build());
        otherMember = memberRepository.save(Member.builder()
                .name("user1")
                .email("user@email.com1")
                .memberRole(MemberRole.USER)
                .build());
    }

    @Test
    void 고장_신고를_저장한다() {
        // given
        FaultReport faultReport = FaultReport.builder()
                .station(station)
                .member(member)
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
                .member(member)
                .build();
        faultReportRepository.save(faultReport);

        // when
        boolean result = faultReportRepository.existsByStationAndMemberId(station, member.getId());

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 충전소와_회원_id_고장신고가_없으면_false를_반환한다() {
        // given
        FaultReport faultReport = FaultReport.builder()
                .station(station)
                .member(member)
                .build();
        faultReportRepository.save(faultReport);

        // when
        boolean result = faultReportRepository.existsByStationAndMemberId(station, 1L);

        // then
        assertThat(result).isFalse();
    }

    @Test
    void 고장_신고_목록을_페이지로_조회한다() {
        // given
        FaultReport faultReport = faultReportRepository.save(FaultReport.builder()
                .station(station)
                .member(member)
                .build());
        faultReportRepository.save(FaultReport.builder()
                .station(station)
                .member(otherMember)
                .build());

        // when
        Page<FaultReport> result = faultReportRepository.findAll(Pageable.ofSize(1));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.getTotalPages()).isEqualTo(2);
            softly.assertThat(result.getContent()).containsExactly(faultReport);
        });
    }
}
