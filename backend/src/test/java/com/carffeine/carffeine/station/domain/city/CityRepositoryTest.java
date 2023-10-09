package com.carffeine.carffeine.station.domain.city;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static com.carffeine.carffeine.station.fixture.station.CityFixture.서울특별시_송파구_잠실동_정보;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class CityRepositoryTest {

    @Autowired
    private CityRepository cityRepository;

    @Test
    void 모든_도시를_페이지로_조회한다() {
        // given
        City city = cityRepository.save(서울특별시_송파구_잠실동_정보);

        // when
        Page<City> result = cityRepository.findAll(Pageable.ofSize(1));

        // then
        assertSoftly(softly -> {
            softly.assertThat(result).hasSize(1);
            softly.assertThat(result.getContent()).containsExactly(city);
        });
    }

    @Test
    void id_값으로_도시를_조회한다() {
        // given
        City city = cityRepository.save(서울특별시_송파구_잠실동_정보);

        // when
        Optional<City> foundCity = cityRepository.findById(city.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(foundCity).isPresent();
            softly.assertThat(foundCity.get()).usingRecursiveComparison().isEqualTo(city);
        });
    }

    @Test
    void 도시_정보를_id_값으로_지운다() {
        // given
        City city = cityRepository.save(서울특별시_송파구_잠실동_정보);

        // when
        cityRepository.deleteById(city.getId());

        // then
        List<City> result = cityRepository.findAll(Pageable.ofSize(1))
                .getContent();

        assertThat(result).hasSize(0);
    }
}
