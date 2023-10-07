package com.carffeine.carffeine.station.domain.station;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class GridGeneratorTest {

    @Test
    void 좌표_2개로_구역을_나눠준다() {
        GridGenerator gridGenerator = new GridGenerator();

        List<Grid> grids = gridGenerator.create(Point.of(0, 3), Point.of(3, 0), 3, 3);

        assertThat(grids).hasSize(9);
    }
}
