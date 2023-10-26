package com.carffeine.carffeine.station.domain.station;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class LatitudeTest {

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
