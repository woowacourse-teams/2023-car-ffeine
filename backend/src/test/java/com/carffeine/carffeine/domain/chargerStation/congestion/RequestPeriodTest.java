package com.carffeine.carffeine.domain.chargerStation.congestion;

import com.carffeine.carffeine.domain.chargestation.congestion.RequestPeriod;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RequestPeriodTest {

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11})
    void ZERO_구간에_있는지_알수있다(int input) {
        RequestPeriod result = RequestPeriod.from(input);

        assertThat(result).isSameAs(RequestPeriod.ZERO);
    }

    @ParameterizedTest
    @ValueSource(ints = {12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23})
    void TWELVE_구간에_있는지_알수있다(int input) {
        RequestPeriod result = RequestPeriod.from(input);

        assertThat(result).isSameAs(RequestPeriod.ZERO);
    }
}
