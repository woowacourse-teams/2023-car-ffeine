package com.carffeine.carffeine.domain.chargestation.charger;

import com.carffeine.carffeine.fixture.chargerstation.ChargerFixture;
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
}
