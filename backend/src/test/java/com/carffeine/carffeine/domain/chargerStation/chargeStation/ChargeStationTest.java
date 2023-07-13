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

    @Test
    void 충전소가_업데이트_된다면_true를_반환한다() {
        // given
        ChargeStation station = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        ChargeStation updatedStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨;

        // when
        boolean isUpdated = station.isUpdated(updatedStation);

        // then
        assertThat(isUpdated).isTrue();
    }

    @Test
    void 충전소가_업데이트가_안된다면_false를_반환한다() {
        // given
        ChargeStation station = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        ChargeStation updatedStation = ChargeStationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;

        // when
        boolean isUpdated = station.isUpdated(updatedStation);

        // then
        assertThat(isUpdated).isFalse();
    }
}
