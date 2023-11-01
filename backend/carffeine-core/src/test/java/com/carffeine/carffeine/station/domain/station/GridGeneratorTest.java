package com.carffeine.carffeine.station.domain.station;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class GridGeneratorTest {

    @Test
    void 좌표_2개로_구역을_나눠준다() {
        // given
        GridGenerator gridGenerator = new GridGenerator();

        // when
        List<Grid> grids = gridGenerator.create(Point.of(0, 3), Point.of(3, 0), 3, 3);

        // then
        assertThat(grids).hasSize(9);
    }

    @Test
    void 우리나라를_세로_2Km_가로_2point5km면_570개의_그리드가_생성된다() {
        // given
        GridGenerator gridGenerator = new GridGenerator();

        // when
        List<Grid> grids = gridGenerator.create(new Point(Latitude.from(BigDecimal.valueOf(38.6341)), Longitude.from(BigDecimal.valueOf(124.5377))), new Point(Latitude.from(BigDecimal.valueOf(33.1906)), Longitude.from(BigDecimal.valueOf(131.8795))), 19, 30);

        // then
        assertSoftly(softly -> {
            softly.assertThat(grids).hasSize(570);
            softly.assertThat(grids.get(0).getTop()).isEqualTo(new Point(Latitude.from(BigDecimal.valueOf(33.1906)), Longitude.from(BigDecimal.valueOf(131.8795))));
            softly.assertThat(grids.get(0).getBottom()).isEqualTo(new Point(Latitude.from(BigDecimal.valueOf(33.4771)), Longitude.from(BigDecimal.valueOf(131.6348))));
        });
    }
}
