package com.carffeine.carffeine.station.domain.station;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class GridTest {

    @Test
    void 범위에_포함되면_true를_반환한다_top_down() {
        // given
        Grid grid = new Grid(Point.of(3, 0), Point.of(0, 3));
        Point point = Point.of(1, 1);

        // when
        boolean result = grid.isContain(point);

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 범위에_포함되면_true를_반환한다_down_top() {
        // given
        Grid grid = new Grid(Point.of(0, 3), Point.of(3, 0));
        Point point = Point.of(1, 1);

        // when
        boolean result = grid.isContain(point);

        // then
        assertThat(result).isTrue();
    }

    @Test
    void 범위에_포함되지_않으면_false를_반환한다() {
        // given
        Grid grid = new Grid(Point.of(0, 0), Point.of(3, 3));
        Point point = Point.of(4, 5);

        // when
        boolean result = grid.isContain(point);

        // then
        assertThat(result).isFalse();
    }
}
