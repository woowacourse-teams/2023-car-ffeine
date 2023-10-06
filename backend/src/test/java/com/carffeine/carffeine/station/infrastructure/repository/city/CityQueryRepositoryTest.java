package com.carffeine.carffeine.station.infrastructure.repository.city;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.city.CityCustomRepositoryImpl;
import com.carffeine.carffeine.station.domain.station.Latitude;
import com.carffeine.carffeine.station.domain.station.Longitude;
import com.carffeine.carffeine.station.infrastructure.repository.city.dto.CitySearchResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_신천동_정보;
import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_잠실동_정보;
import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_정보;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CityQueryRepositoryTest extends IntegrationTest {

    @Autowired
    private CityQueryRepository cityQueryRepository;

    @Autowired
    private CityCustomRepositoryImpl cityCustomRepository;

    @Test
    void 지역을_최대_3개_불러온다() {
        // given
        cityCustomRepository.saveAll(List.of(
                서울특별시_정보,
                서울특별시_송파구_잠실동_정보,
                서울특별시_송파구_신천동_정보
        ));

        // when
        List<CitySearchResponse> result = cityQueryRepository.findSearchResult("서울");

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(3);
            softly.assertThat(result.get(0)).usingRecursiveComparison()
                    .isEqualTo(new CitySearchResponse("서울특별시", Latitude.from("37.5666103").getValue(), Longitude.from("126.9783882").getValue()));
            softly.assertThat(result.get(1)).usingRecursiveComparison()
                    .isEqualTo(new CitySearchResponse("서울특별시 송파구 잠실동", Latitude.from("37.5666103").getValue(), Longitude.from("126.9783882").getValue()));
            softly.assertThat(result.get(2)).usingRecursiveComparison()
                    .isEqualTo(new CitySearchResponse("서울특별시 송파구 신천동", Latitude.from("37.5666103").getValue(), Longitude.from("126.9783882").getValue()));
        });
    }
}
