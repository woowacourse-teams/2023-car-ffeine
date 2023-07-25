package com.carffeine.carffeine.station.infrastructure.repository;

import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@SpringBootTest
class StationRepositoryImplTest {

    @Autowired
    private StationRepositoryImpl chargeStationRepositoryImpl;

    @Autowired
    private StationRepository stationRepository;

    @Test
    void 충전소가_저장된다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

        // when
        chargeStationRepositoryImpl.saveAll(List.of(station));

        // then
        Station savedStation = stationRepository.findChargeStationByStationId(station.getStationId()).get();
        assertSoftly(softly -> {
            softly.assertThat(savedStation.getStationId()).isEqualTo(station.getStationId());
            softly.assertThat(savedStation.getCompanyName()).isEqualTo(station.getCompanyName());
            softly.assertThat(savedStation.getContact()).isEqualTo(station.getContact());
            softly.assertThat(savedStation.getIsPrivate()).isEqualTo(station.getIsPrivate());
            softly.assertThat(savedStation.getStationName()).isEqualTo(station.getStationName());
            softly.assertThat(savedStation.getLatitude()).isEqualTo(station.getLatitude());
            softly.assertThat(savedStation.getLongitude()).isEqualTo(station.getLongitude());
            softly.assertThat(savedStation.getOperatingTime()).isEqualTo(station.getOperatingTime());
            softly.assertThat(savedStation.getIsParkingFree()).isEqualTo(station.getIsParkingFree());
            softly.assertThat(savedStation.getDetailLocation()).isEqualTo(station.getDetailLocation());
        });
    }
}
