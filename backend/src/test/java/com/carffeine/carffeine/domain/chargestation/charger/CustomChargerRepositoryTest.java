package com.carffeine.carffeine.domain.chargestation.charger;

import com.carffeine.carffeine.fixture.chargerstation.ChargerFixture;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CustomChargerRepositoryTest extends IntegrationTest {

    @Autowired
    private CustomChargerRepository customChargerRepository;
    @Autowired
    private ChargerRepository chargerRepository;

    @Test
    void 충전기를_배치_저장한다() {
        // given
        Charger charger = ChargerFixture.선릉역_충전기_2번_사용_중;
        List<Charger> chargers = List.of(charger);

        // when
        customChargerRepository.saveAllChargersBatch(chargers);

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
        customChargerRepository.updateAllChargersBatch(List.of(updated));

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
