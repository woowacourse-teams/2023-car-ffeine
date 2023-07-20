package com.carffeine.carffeine.service.chargerStation;

import com.carffeine.carffeine.domain.chargestation.ChargeStation;
import com.carffeine.carffeine.domain.chargestation.ChargeStationRepository;
import com.carffeine.carffeine.fixture.chargerstation.ChargeStationFixture;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.service.chargerstation.ChargerStationUpdateService;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ChargerStationUpdateServiceTest extends IntegrationTest {

    @Autowired
    private ChargerStationUpdateService chargerStationUpdateService;

    @Autowired
    private ChargeStationRepository chargeStationRepository;

    @Test
    void 기존에_없던_충전소가_생기면_저장한다() {
        // given
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개);

        // when
        chargerStationUpdateService.updateStations(updateStations);

        // then
        List<ChargeStation> result = chargeStationRepository.findAll();
        assertThat(result.get(0)).isEqualTo(updateStations.get(0));
    }

    @Test
    void 기존에_있던_충전소의_데이터가_변경되면_수정한다() {
        // given
        ChargeStation originStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        ChargeStation changeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨;

        chargeStationRepository.save(originStation);
        List<ChargeStation> updateStations = List.of(changeStation);

        // when
        chargerStationUpdateService.updateStations(updateStations);

        // then
        List<ChargeStation> stations = chargeStationRepository.findAll();
        assertThat(stations.get(0).getStationName()).isEqualTo(changeStation.getStationName());
    }

    @Test
    void 기존에_없던_충전기가_생기면_저장한다() {
        // given
        ChargeStation originStation = ChargeStationFixture.선릉역_충전소_충전기_0개_사용가능_0개;
        chargeStationRepository.save(originStation);
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.잠실역_충전소_충전기_2개_사용가능_1개);

        // when
        chargerStationUpdateService.updateStations(updateStations);

        // then
        List<ChargeStation> stations = chargeStationRepository.findAll();
        assertThat(stations.size()).isEqualTo(2);
    }

    @Test
    void 기존에_있던_충전기의_데이터가_변경되면_수정한다() {
        // given
        ChargeStation originStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        chargeStationRepository.save(originStation);
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨);

        // when
        chargerStationUpdateService.updateStations(updateStations);

        // then
        List<ChargeStation> stations = chargeStationRepository.findAll();
        assertThat(stations.get(0).getStationName()).isEqualTo(updateStations.get(0).getStationName());
    }
}
