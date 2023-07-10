package com.carffeine.carffeine.domain.chargerStation.chargeStation;

import com.carffeine.carffeine.domain.chargerStation.chargeStation.ChargeStation;
import com.carffeine.carffeine.fixture.chargerStation.ChargeStationFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ChargeStationTest {

    @Test
    void 전체_충전기_수를_반환한다() {
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

        int actual = chargeStation.getTotalCount();

        assertThat(actual).isEqualTo(2);
    }

    @Test
    void 사용_가능한_충전기_수를_반환한다() {
        ChargeStation chargeStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

        int actual = chargeStation.getAvailableCount();

        assertThat(actual).isEqualTo(1);
    }
}
