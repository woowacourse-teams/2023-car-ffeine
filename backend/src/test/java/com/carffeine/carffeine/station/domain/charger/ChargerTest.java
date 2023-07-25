package com.carffeine.carffeine.station.domain.charger;

import com.carffeine.carffeine.station.fixture.charger.ChargerFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ChargerTest {

    @Test
    void 충전기가_사용_가능하면_true를_반환한다() {
        Charger charger = ChargerFixture.선릉역_충전기_1번_사용가능;

        boolean expect = charger.isAvailable();

        assertThat(expect).isTrue();
    }

    @Test
    void 충전기가_업데이트_된다면_true를_반환한다() {
        // given
        Charger charger = ChargerFixture.선릉역_충전기_2번_사용_중;
        Charger updateCharger = ChargerFixture.선릉역_충전기_2번_변경됨;

        // when
        boolean isUpdated = charger.isUpdated(updateCharger);

        // then
        assertThat(isUpdated).isTrue();
    }

    @Test
    void 충전기가_업데이트가_안된다면_false를_반환한다() {
        // given
        Charger charger = ChargerFixture.선릉역_충전기_2번_사용_중;
        Charger updateCharger = ChargerFixture.선릉역_충전기_2번_사용_중;

        // when
        boolean isUpdated = charger.isUpdated(updateCharger);

        // then
        assertThat(isUpdated).isFalse();
    }
}
