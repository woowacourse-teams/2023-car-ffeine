package com.carffeine.carffeine.infra.repository;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStationRepository;
import com.carffeine.carffeine.fixture.chargerStation.ChargeStationFixture;
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
class ChargeStationRepositoryImplTest {

    @Autowired
    private ChargeStationRepositoryImpl chargeStationRepositoryImpl;

    @Autowired
    private ChargeStationRepository chargeStationRepository;

    @Test
    void 충전소가_잘_저장된다() {
        // given
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

        // when
        chargeStationRepositoryImpl.saveAll(List.of(chargeStation));
        // then
        ChargeStation savedChargeStation = chargeStationRepository.findChargeStationByStationId(chargeStation.getStationId()).get();
        assertSoftly(softly -> {
            softly.assertThat(savedChargeStation.getStationId()).isEqualTo(chargeStation.getStationId());
            softly.assertThat(savedChargeStation.getCompanyName()).isEqualTo(chargeStation.getCompanyName());
            softly.assertThat(savedChargeStation.getContact()).isEqualTo(chargeStation.getContact());
            softly.assertThat(savedChargeStation.getIsPrivate()).isEqualTo(chargeStation.getIsPrivate());
            softly.assertThat(savedChargeStation.getStationName()).isEqualTo(chargeStation.getStationName());
            softly.assertThat(savedChargeStation.getLatitude()).isEqualTo(chargeStation.getLatitude());
            softly.assertThat(savedChargeStation.getLongitude()).isEqualTo(chargeStation.getLongitude());
            softly.assertThat(savedChargeStation.getOperatingTime()).isEqualTo(chargeStation.getOperatingTime());
            softly.assertThat(savedChargeStation.getIsParkingFree()).isEqualTo(chargeStation.getIsParkingFree());
            softly.assertThat(savedChargeStation.getDetailLocation()).isEqualTo(chargeStation.getDetailLocation());
        });
    }
}
