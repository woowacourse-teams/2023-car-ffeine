package com.carffeine.carffeine.admin.service;

import com.carffeine.carffeine.admin.exception.AdminException;
import com.carffeine.carffeine.admin.exception.AdminExceptionType;
import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.domain.MemberRole;
import com.carffeine.carffeine.station.domain.station.FakeStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
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
public class AdminStationServiceTest {

    private StationRepository stationRepository;
    private MemberRepository memberRepository;
    private AdminStationService adminStationService;
    private Member admin;
    private Member user;

    @BeforeEach
    void setUp() {
        memberRepository = new FakeMemberRepository();
        stationRepository = new FakeStationRepository();
        adminStationService = new AdminStationService(stationRepository, memberRepository);

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
            stationRepository.save(Station.builder()
                    .stationId("id" + i)
                    .build());
        }

        // when
        Page<Station> stations = adminStationService.getStations(of(0, 10), null, admin.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(stations.getNumberOfElements()).isEqualTo(10);
            softly.assertThat(stations.getTotalPages()).isEqualTo(3);
        });
    }

    @Test
    void 충전소의_이름으로_검색한_결과와_모든_정보를_요청한_갯수만큼_가져온다() {
        // given
        for (int i = 0; i < 30; i++) {
            stationRepository.save(Station.builder()
                    .stationId("id" + i)
                    .stationName("n" + i)
                    .build());
        }
        // when
        Page<Station> stations = adminStationService.getStations(of(0, 10), "9", admin.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(stations.getNumberOfElements()).isEqualTo(3);
            softly.assertThat(stations.getTotalPages()).isEqualTo(1);
        });
    }

    @Test
    void 충전소_조회_시_관리자가_아니라면_예외가_발생한다() {
        assertThatThrownBy(() -> adminStationService.getStations(of(0, 10), "9", user.getId()))
                .isInstanceOf(AdminException.class)
                .hasMessage(AdminExceptionType.NOT_ADMIN.message());
    }

    @Test
    void 충전소의_정보를_상세_조회한다() {
        // given
        Station saved = stationRepository.save(StationFixture.천호역_충전소_충전기_2개_사용가능_0개);

        // when
        Station station = adminStationService.getStation(saved.getStationId(), admin.getId());

        // then
        assertThat(station).usingRecursiveComparison()
                .isEqualTo(saved);
    }
}
