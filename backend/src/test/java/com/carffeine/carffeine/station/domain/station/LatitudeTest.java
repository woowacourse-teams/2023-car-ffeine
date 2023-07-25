package com.carffeine.carffeine.station.domain.station;

import com.carffeine.carffeine.station.exception.StationException;
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
class LatitudeTest {

    @ValueSource(strings = {"32.9", "39.1"})
    @ParameterizedTest
    void 대한민국_범위의_위도가_아니면_예외가_발생한다(String expect) {
        assertThatThrownBy(() -> Latitude.from(expect))
                .isInstanceOf(StationException.class)
                .hasMessage("유효하지 않는 위도입니다");
    }

    @Test
    void 위도의_변화량에_따른_최소값을_구한다() {
        //given
        Latitude latitude = Latitude.from("34.4");

        //when
        Latitude actual = latitude.calculateMinLatitudeByDelta(BigDecimal.valueOf(1));

        //then
        assertThat(actual.getValue()).isEqualTo(BigDecimal.valueOf(33.4));
    }

    @Test
    void 위도의_변화량에_따른_최대값을_구한다() {
        //given
        Latitude latitude = Latitude.from("34.4");

        //when
        Latitude actual = latitude.calculateMaxLatitudeByDelta(BigDecimal.valueOf(1));

        //then
        assertThat(actual.getValue()).isEqualTo(BigDecimal.valueOf(35.4));
    }
}
