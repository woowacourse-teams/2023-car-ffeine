package com.carffeine.carffeine.station.service;

import com.carffeine.carffeine.station.domain.Grid;
import com.carffeine.carffeine.station.domain.GridGenerator;
import com.carffeine.carffeine.station.domain.Point;
import com.carffeine.carffeine.station.infrastructure.dto.StationPoint;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StationGridServiceTest {

    private StationGridService stationGridService;

    @BeforeEach
    void setUp() {
        stationGridService = new StationGridService();
    }

    @Test
    void 그리드에_포함되는_충전소를_추가한다() {
        // given
        GridGenerator gridGenerator = new GridGenerator();
        List<Grid> grids = gridGenerator.create(Point.of(39, 124), Point.of(38, 129), 3, 3);
        StationPoint stationPoint = new StationPoint(BigDecimal.valueOf(38.3994933), BigDecimal.valueOf(128.3994933));
        StationPoint stationPoint2 = new StationPoint(BigDecimal.valueOf(36), BigDecimal.valueOf(123.3994933));

        // when
        List<Grid> assignedGrids = stationGridService.assignStationGrids(grids, List.of(stationPoint, stationPoint2));

        // then
        assertThat(assignedGrids).map(it -> it.getPoints().size())
                .isEqualTo(List.of(1, 0, 0, 1, 0, 0, 1, 0, 0));
    }
}
