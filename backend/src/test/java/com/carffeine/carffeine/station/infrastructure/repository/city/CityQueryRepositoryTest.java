package com.carffeine.carffeine.station.infrastructure.repository.city;

import com.carffeine.carffeine.city.infrastructure.repository.CityCustomRepositoryImpl;
import com.carffeine.carffeine.city.infrastructure.repository.CityQueryRepository;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.city.domain.City;
import com.carffeine.carffeine.city.infrastructure.repository.dto.CitySearchResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_가가동_정보;
import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_신천동_정보;
import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_잠실동_정보;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CityQueryRepositoryTest extends IntegrationTest {

    @Autowired
    private CityQueryRepository cityQueryRepository;

    @Autowired
    private CityCustomRepositoryImpl cityCustomRepository;

    @Test
    void 지역을_최대_3개_오름차순으로_불러온다() {
        // given
        City 가가동 = 서울특별시_송파구_가가동_정보;
        City 잠실동 = 서울특별시_송파구_잠실동_정보;
        City 신천동 = 서울특별시_송파구_신천동_정보;
        cityCustomRepository.saveAll(List.of(가가동, 잠실동, 신천동));

        List<CitySearchResponse> expect = List.of(
                new CitySearchResponse(가가동.getName(), 가가동.getLatitude().getValue(), 가가동.getLongitude().getValue()),
                new CitySearchResponse(신천동.getName(), 신천동.getLatitude().getValue(), 신천동.getLongitude().getValue()),
                new CitySearchResponse(잠실동.getName(), 잠실동.getLatitude().getValue(), 잠실동.getLongitude().getValue())
        );

        // when
        List<CitySearchResponse> result = cityQueryRepository.findSearchResult("송파");


        // then
        assertThat(result).usingRecursiveComparison().isEqualTo(expect);
    }
}
