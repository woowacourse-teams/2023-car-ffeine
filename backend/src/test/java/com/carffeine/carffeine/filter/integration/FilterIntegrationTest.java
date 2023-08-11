package com.carffeine.carffeine.filter.integration;

import com.carffeine.carffeine.filter.domain.FilterType;
import com.carffeine.carffeine.filter.dto.FiltersRequest;
import com.carffeine.carffeine.filter.dto.FiltersResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class FilterIntegrationTest extends FilterIntegrationFixture {

    private FiltersRequest 필터_리스트;
    private FiltersRequest 충전_속도_필터_리스트;

    @BeforeEach
    void setup() {
        필터_리스트 = new FiltersRequest(
                List.of("광주시", FilterType.COMPANIES.getName()),
                List.of(),
                List.of("DC_COMBO", FilterType.CONNECTOR_TYPES.getName())
        );

        충전_속도_필터_리스트 = new FiltersRequest(
                List.of(),
                List.of("2.00"),
                List.of()
        );

        생성요청("/filters", 필터_리스트);
    }

    @Test
    void 모든_필터를_조회한다() {
        // when
        var 필터_조회_응답 = 모든_필터를_조회한다("/filters");
        var 필터_조회_결과 = 필터_조회_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(필터_조회_결과.companies().get(0), "광주시");
        단일_검증(필터_조회_결과.connectorTypes().get(0), "DC_COMBO");
    }

    @Test
    void 필터를_등록한다() {
        // when
        var 필터_생성_응답 = 생성요청("/filters", 충전_속도_필터_리스트);
        var 필터_생성_결과 = 필터_생성_응답.body().as(FiltersResponse.class);

        // then
        단일_검증(필터_생성_결과.capacities().get(0), "2.00");
    }

    @Test
    void 필터를_제거한다() {
        // when
        제거요청("/filters/2.00");

        // then
        var 필터_조회_응답 = 모든_필터를_조회한다("/filters");
        var 필터_조회_결과 = 필터_조회_응답.body().as(FiltersResponse.class);

        단일_검증(필터_조회_결과.capacities(), Collections.emptyList());
    }
}
