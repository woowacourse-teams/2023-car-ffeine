package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.fixture.station.StationFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StationTest {

    @Test
    void 전체_충전기_수를_반환한다() {
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

        long actual = station.getTotalCount();

        assertThat(actual).isEqualTo(2);
    }

    @Test
    void 사용_가능한_충전기_수를_반환한다() {
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;

        Long actual = station.getAvailableCount();

        assertThat(actual).isEqualTo(1);
    }

    @Test
    void 충전소가_업데이트_된다면_true를_반환한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        Station updatedStation = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_이름_변경됨;

        // when
        boolean isUpdated = station.isUpdated(updatedStation);

        // then
        assertThat(isUpdated).isTrue();
    }

    @Test
    void 충전소가_업데이트가_안된다면_false를_반환한다() {
        // given
        Station station = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;
        Station updatedStation = StationFixture.선릉역_충전소_충전기_2개_사용가능_1개_완속;

        // when
        boolean isUpdated = station.isUpdated(updatedStation);

        // then
        assertThat(isUpdated).isFalse();
    }
}
