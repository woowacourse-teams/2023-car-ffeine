package com.carffeine.carffeine.domain.chargestation;

import com.carffeine.carffeine.domain.chargestation.charger.Charger;
import com.carffeine.carffeine.domain.chargestation.charger.ChargerRepository;
import com.carffeine.carffeine.fixture.chargerstation.ChargeStationFixture;
import com.carffeine.carffeine.fixture.chargerstation.ChargerFixture;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ChargeUpdateJdbcTest extends IntegrationTest {

    @Autowired
    private ChargeUpdateJdbc chargeUpdateJdbc;

    @Autowired
    private ChargeStationRepository chargeStationRepository;

    @Autowired
    private ChargerRepository chargerRepository;

    @Test
    void 충전소를_배치_저장한다() {
        // given
        List<ChargeStation> chargeStations = List.of(
                ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개
        );

        // when
        chargeUpdateJdbc.saveAllStationsBatch(chargeStations);

        // then
        List<ChargeStation> result = chargeStationRepository.findAll();
        assertSoftly(softly -> {
            softly.assertThat(result.get(0).getStationId()).isEqualTo(chargeStations.get(0).getStationId());
            softly.assertThat(result.get(0).getCompanyName()).isEqualTo(chargeStations.get(0).getCompanyName());
            softly.assertThat(result.get(0).getContact()).isEqualTo(chargeStations.get(0).getContact());
            softly.assertThat(result.get(0).getAddress()).isEqualTo(chargeStations.get(0).getAddress());
            softly.assertThat(result.get(0).getIsPrivate()).isEqualTo(chargeStations.get(0).getIsPrivate());
            softly.assertThat(result.get(0).getStationName()).isEqualTo(chargeStations.get(0).getStationName());
            softly.assertThat(result.get(0).getLatitude()).isEqualTo(chargeStations.get(0).getLatitude());
            softly.assertThat(result.get(0).getLongitude()).isEqualTo(chargeStations.get(0).getLongitude());
            softly.assertThat(result.get(0).getOperatingTime()).isEqualTo(chargeStations.get(0).getOperatingTime());
            softly.assertThat(result.get(0).getIsParkingFree()).isEqualTo(chargeStations.get(0).getIsParkingFree());
            softly.assertThat(result.get(0).getDetailLocation()).isEqualTo(chargeStations.get(0).getDetailLocation());
        });
    }

    @Test
    void 충전소의_정보를_배치_업데이트한다() {
        // given
        ChargeStation station = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
        chargeStationRepository.save(station);

        // when
        List<ChargeStation> updateStations = List.of(ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨);
        chargeUpdateJdbc.updateAllStationsBatch(updateStations);

        // then
        ChargeStation updatedStation = chargeStationRepository.findChargeStationByStationId(station.getStationId()).get();
        Assertions.assertThat(updatedStation.getStationName()).isEqualTo(updateStations.get(0).getStationName());
    }

    @Test
    void 충전기를_배치_저장한다() {
        // given
        Charger charger = ChargerFixture.선릉역_충전기_2번_사용_중;
        List<Charger> chargers = List.of(charger);

        // when
        chargeUpdateJdbc.saveAllChargersBatch(chargers);

        // then
        Charger result = chargerRepository.findByChargerIdAndStationId(charger.getChargerId(), charger.getStationId()).get();
        assertSoftly(softly -> {
            softly.assertThat(result.getStationId()).isEqualTo(charger.getStationId());
            softly.assertThat(result.getChargerId()).isEqualTo(charger.getChargerId());
            softly.assertThat(result.getType()).isEqualTo(charger.getType());
            softly.assertThat(result.getPrice()).isEqualByComparingTo(charger.getPrice());
            softly.assertThat(result.getCapacity()).isEqualByComparingTo(charger.getCapacity());
            softly.assertThat(result.getMethod()).isEqualTo(charger.getMethod());
        });
    }

    @Test
    void 충전기를_배치_업데이트한다() {
        // given
        Charger charger = ChargerFixture.선릉역_충전기_2번_사용_중;
        Charger updated = ChargerFixture.선릉역_충전기_2번_변경됨;
        chargerRepository.save(charger);

        // when
        chargeUpdateJdbc.updateAllChargersBatch(List.of(updated));

        // then
        Charger result = chargerRepository.findByChargerIdAndStationId(charger.getChargerId(), charger.getStationId()).get();
        assertSoftly(softly -> {
            softly.assertThat(updated.getStationId()).isEqualTo(result.getStationId());
            softly.assertThat(updated.getChargerId()).isEqualTo(result.getChargerId());
            softly.assertThat(updated.getType()).isEqualTo(result.getType());
            softly.assertThat(updated.getPrice()).isEqualByComparingTo(result.getPrice());
            softly.assertThat(updated.getCapacity()).isEqualByComparingTo(result.getCapacity());
            softly.assertThat(updated.getMethod()).isEqualTo(result.getMethod());
        });
    }
}
