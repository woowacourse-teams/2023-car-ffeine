package com.carffeine.carffeine.station.service;

import com.carffeine.carffeine.fixture.station.StationFixture;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.station.domain.StationRepository;
import com.carffeine.support.IntegrationTest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StationUpdateServiceTest extends IntegrationTest {

    @Autowired
    private StationUpdateService stationUpdateService;

    @Autowired
    private StationRepository stationRepository;

    @Test
    void 기존에_없던_충전소가_생기면_저장한다() {
        // given
        List<Station> updateStations = List.of(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개);

        // when
        stationUpdateService.updateStations(updateStations);

        // then
        List<Station> result = stationRepository.findAll();
        assertThat(result.get(0)).isEqualTo(updateStations.get(0));
    }

    @Test
    void 기존에_있던_충전소의_데이터가_변경되면_수정한다() {
        // given
        Station originStation = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        Station changeStation = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨;

        stationRepository.save(originStation);
        List<Station> updateStations = List.of(changeStation);

        // when
        stationUpdateService.updateStations(updateStations);

        // then
        List<Station> stations = stationRepository.findAll();
        assertThat(stations.get(0).getStationName()).isEqualTo(changeStation.getStationName());
    }

    @Test
    void 기존에_없던_충전기가_생기면_저장한다() {
        // given
        Station originStation = StationFixture.선릉역_충전소_충전기_0개_사용가능_0개;
        stationRepository.save(originStation);
        List<Station> updateStations = List.of(StationFixture.잠실역_충전소_충전기_2개_사용가능_1개);

        // when
        stationUpdateService.updateStations(updateStations);

        // then
        List<Station> stations = stationRepository.findAll();
        assertThat(stations.size()).isEqualTo(2);
    }

    @Test
    void 기존에_있던_충전기의_데이터가_변경되면_수정한다() {
        // given
        Station originStation = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        stationRepository.save(originStation);
        List<Station> updateStations = List.of(StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨);

        // when
        stationUpdateService.updateStations(updateStations);

        // then
        List<Station> stations = stationRepository.findAll();
        assertThat(stations.get(0).getStationName()).isEqualTo(updateStations.get(0).getStationName());
    }
}
