package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CustomStationRepositoryTest extends IntegrationTest {

    @Autowired
    private CustomStationRepository customStationRepository;
    @Autowired
    private StationRepository stationRepository;

    @Test
    void 충전소를_배치_저장한다() {
        // given
        List<Station> stations = List.of(
                StationFixture.선릉역_충전소_충전기_2개_사용가능_1개
        );

        // when
        customStationRepository.saveAllStationsBatch(stations);

        // then
        List<Station> result = stationRepository.findAll();
        assertSoftly(softly -> {
            softly.assertThat(result.get(0).getStationId()).isEqualTo(stations.get(0).getStationId());
            softly.assertThat(result.get(0).getCompanyName()).isEqualTo(stations.get(0).getCompanyName());
            softly.assertThat(result.get(0).getContact()).isEqualTo(stations.get(0).getContact());
            softly.assertThat(result.get(0).isPrivate()).isEqualTo(stations.get(0).isPrivate());
            softly.assertThat(result.get(0).getStationName()).isEqualTo(stations.get(0).getStationName());
            softly.assertThat(result.get(0).getLatitude()).isEqualTo(stations.get(0).getLatitude());
            softly.assertThat(result.get(0).getLongitude()).isEqualTo(stations.get(0).getLongitude());
            softly.assertThat(result.get(0).getOperatingTime()).isEqualTo(stations.get(0).getOperatingTime());
            softly.assertThat(result.get(0).isParkingFree()).isEqualTo(stations.get(0).isParkingFree());
            softly.assertThat(result.get(0).getDetailLocation()).isEqualTo(stations.get(0).getDetailLocation());
        });
    }

    @Test
    void 충전소의_정보를_배치_업데이트한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(station);

        // when
        List<Station> updateStations = List.of(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨);
        customStationRepository.updateAllStationsBatch(updateStations);

        // then
        Station updatedStation = stationRepository.findChargeStationByStationId(station.getStationId()).get();
        Assertions.assertThat(updatedStation.getStationName()).isEqualTo(updateStations.get(0).getStationName());
    }

}
