package com.carffeine.carffeine.station.congestion;

import com.carffeine.carffeine.station.domain.congestion.RequestPeriod;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RequestPeriodTest {

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23})
    void 하루종일_시간_마다_작동한다(int input) {
        // when
        RequestPeriod result = RequestPeriod.from(input);

        // then
        assertThat(result.getSection()).isEqualTo(input * 100);
    }
}
