package com.carffeine.carffeine.domain.chargestation;

import com.carffeine.carffeine.fixture.chargerstation.ChargeStationFixture;
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
class CustomChargeStationRepositoryTest extends IntegrationTest {

    @Autowired
    private CustomChargeStationRepository customChargeStationRepository;
    @Autowired
    private ChargeStationRepository chargeStationRepository;

    @Test
    void 충전소를_배치_저장한다() {
        // given
        List<ChargeStation> chargeStations = List.of(
                ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개
        );

        // when
        customChargeStationRepository.saveAllStationsBatch(chargeStations);

        // then
        List<ChargeStation> result = chargeStationRepository.findAll();
        assertSoftly(softly -> {
            softly.assertThat(result.get(0).getStationId()).isEqualTo(chargeStations.get(0).getStationId());
            softly.assertThat(result.get(0).getCompanyName()).isEqualTo(chargeStations.get(0).getCompanyName());
            softly.assertThat(result.get(0).getContact()).isEqualTo(chargeStations.get(0).getContact());
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
        customChargeStationRepository.updateAllStationsBatch(updateStations);

        // then
        ChargeStation updatedStation = chargeStationRepository.findChargeStationByStationId(station.getStationId()).get();
        Assertions.assertThat(updatedStation.getStationName()).isEqualTo(updateStations.get(0).getStationName());
    }

}
