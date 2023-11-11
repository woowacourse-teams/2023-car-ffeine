package com.carffeine.carffeine.filter.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class FilterRepositoryTest {

    @Autowired
    private FilterRepository filterRepository;

    @Test
    void 필터를_모두_저장한다() {
        // given
        List<Filter> filters = List.of(Filter.of("회사명", FilterType.COMPANY.getName()));

        // when
        filterRepository.saveAll(filters);

        // then
        List<Filter> findFilters = filterRepository.findAll();
        assertThat(findFilters.size()).isEqualTo(1);
    }

    @Test
    void 필터를_모두_조회한다() {
        // given
        List<Filter> filters = List.of(Filter.of("회사명", FilterType.COMPANY.getName()));
        filterRepository.saveAll(filters);

        // when
        List<Filter> findFilters = filterRepository.findAll();

        // then
        assertThat(findFilters.size()).isEqualTo(1);
    }

    @Test
    void 필터를_이름으로_찾는다() {
        // given
        List<Filter> filters = List.of(Filter.of("회사명", FilterType.COMPANY.getName()));
        filterRepository.saveAll(filters);

        // when
        Filter filter = filterRepository.findByName("회사명").get();

        // then
        assertThat(filter.getName()).isEqualTo("회사명");
    }
}
