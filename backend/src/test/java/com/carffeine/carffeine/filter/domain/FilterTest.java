package com.carffeine.carffeine.filter.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class FilterTest {

    @Test
    void 충전_용량_필터를_생성한다() {
        // when
        Filter filter = Filter.of("100.00", "capacities");

        // then
        assertSoftly(softly -> {
            softly.assertThat(filter.getName()).isEqualTo("100.00");
            softly.assertThat(filter.getFilterType()).isEqualTo(FilterType.CAPACITIES);
        });

    }

    @ParameterizedTest
    @ValueSource(strings = {"companies", "connectorTypes"})
    void 필터_타입에_해당하는_필터를_생성한다(String filterType) {
        // when
        Filter filter = Filter.of("name", filterType);

        // then
        assertThat(filter.getFilterType()).isEqualTo(FilterType.from(filterType));
    }
}
