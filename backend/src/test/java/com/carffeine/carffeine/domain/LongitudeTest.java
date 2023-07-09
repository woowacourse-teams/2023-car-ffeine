package com.carffeine.carffeine.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class LongitudeTest {

    @ValueSource(strings = {"124.9", "132.1"})
    @ParameterizedTest
    void 대한민국_범위의_경도가_아니면_예외가_발생한다(String expect) {
        assertThatThrownBy(() -> Longitude.from(expect))
                .isInstanceOf(ChargeStationException.class)
                .hasMessage("유효하지 않는 경도입니다");
    }

    @Test
    void 경도의_변화량에_따른_최소값을_구한다() {
        //given
        Longitude longitude = Longitude.from("126.4");

        //when
        Longitude actual = longitude.minLongitudeByDelta(BigDecimal.valueOf(1));

        //then
        assertThat(actual.getValue()).isEqualTo(BigDecimal.valueOf(125.4));
    }

    @Test
    void 경도의_변화량에_따른_최대값을_구한다() {
        //given
        Longitude longitude = Longitude.from("126.4");

        //when
        Longitude actual = longitude.maxLongitudeByDelta(BigDecimal.valueOf(1));

        //then
        assertThat(actual.getValue()).isEqualTo(BigDecimal.valueOf(127.4));
    }
}
