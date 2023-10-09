package com.carffeine.carffeine.station.domain.city;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.infrastructure.repository.city.CityCustomRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_가가동_정보;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CityCustomRepositoryImplTest extends IntegrationTest {

    @Autowired
    private CityCustomRepository cityCustomRepository;

    @Test
    void 이미_도시_정보가_저장_됐다면_true를_반환한다() {
        // given
        List<City> cities = List.of(서울특별시_송파구_가가동_정보);
        cityCustomRepository.saveAll(cities);

        // when
        boolean result = cityCustomRepository.isExist();

        // then
        assertThat(result).isTrue();
    }
}
