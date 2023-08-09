package com.carffeine.carffeine.filter.service;

import com.carffeine.carffeine.filter.controller.dto.capacity.CapacitiesRequest;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNameRequest;
import com.carffeine.carffeine.filter.controller.dto.companyName.CompanyNamesRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypeRequest;
import com.carffeine.carffeine.filter.controller.dto.connectorType.ConnectorTypesRequest;
import com.carffeine.carffeine.filter.controller.dto.filter.FiltersResponse;
import com.carffeine.carffeine.filter.domain.capacity.Capacity;
import com.carffeine.carffeine.filter.domain.capacity.CapacityRepository;
import com.carffeine.carffeine.filter.domain.companyName.CompanyName;
import com.carffeine.carffeine.filter.domain.companyName.CompanyNameRepository;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorType;
import com.carffeine.carffeine.filter.domain.connectorType.ConnectorTypeRepository;
import com.carffeine.carffeine.filter.exception.FilterException;
import com.carffeine.carffeine.filter.exception.FilterExceptionType;
import com.carffeine.carffeine.filter.fake.FakeCapacityRepository;
import com.carffeine.carffeine.filter.fake.FakeCompanyNameRepository;
import com.carffeine.carffeine.filter.fake.FakeConnectorTypeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class FilterServiceTest {

    private FilterService filterService;
    private CompanyNameRepository companyNameRepository;
    private ConnectorTypeRepository connectorTypeRepository;
    private CapacityRepository capacityRepository;

    @BeforeEach
    void initBefore() {
        companyNameRepository = new FakeCompanyNameRepository();
        connectorTypeRepository = new FakeConnectorTypeRepository();
        capacityRepository = new FakeCapacityRepository();
        filterService = new FilterService(companyNameRepository, connectorTypeRepository, capacityRepository);
    }

    @Test
    void 현재_저장된_모든_필터를_반환한다() {
        // given
        companyNameRepository.saveAll(List.of(CompanyName.from("HG", "환경부")));
        connectorTypeRepository.saveAll(List.of(ConnectorType.from("DC_COMBO", "고속")));
        capacityRepository.saveAll(List.of(Capacity.from(BigDecimal.valueOf(2.00))));

        // when
        FiltersResponse result = filterService.findAllFilters();

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.companyNames().size()).isEqualTo(1);
            softly.assertThat(result.capacities().size()).isEqualTo(1);
            softly.assertThat(result.connectorTypes().size()).isEqualTo(1);
        });
    }

    @Test
    void 회사_이름을_필터로_저장한다() {
        // given
        CompanyNamesRequest companyNamesRequest = new CompanyNamesRequest(List.of(new CompanyNameRequest("HG", "환경부")));

        // when
        filterService.saveCompanyNamesFilter(companyNamesRequest);

        // then
        List<CompanyName> companyNames = companyNameRepository.findAll();

        assertSoftly(softly -> {
            softly.assertThat(companyNames.size()).isEqualTo(1);
            softly.assertThat(companyNames.get(0).getCompanyKey()).isEqualTo(companyNamesRequest.companyNames().get(0).key());
        });
    }

    @Test
    void 충전기_명이_중복되면_예외_발생한다() {
        CompanyNamesRequest companyNamesRequest = new CompanyNamesRequest(List.of(new CompanyNameRequest("HG", "환경부")));
        filterService.saveCompanyNamesFilter(companyNamesRequest);

        // when
        assertThatThrownBy(() -> filterService.saveCompanyNamesFilter(companyNamesRequest))
                .isInstanceOf(FilterException.class)
                .hasMessage(FilterExceptionType.FILTER_ALREADY_REGISTERED.message());
    }

    @Test
    void 충전기_타입을_필터로_저장한다() {
        // given
        ConnectorTypesRequest connectorTypesRequest = new ConnectorTypesRequest(List.of(new ConnectorTypeRequest("DC_COMBO", "고속")));

        // when
        filterService.saveConnectorTypesFilter(connectorTypesRequest);

        // then
        List<ConnectorType> connectorTypes = connectorTypeRepository.findAll();

        assertSoftly(softly -> {
            softly.assertThat(connectorTypes.size()).isEqualTo(1);
            softly.assertThat(connectorTypes.get(0).getConnectorKey()).isEqualTo(connectorTypesRequest.connectTypes().get(0).key());
        });
    }

    @Test
    void 충전기_타입이_중복되면_예외_발생한다() {
        ConnectorTypesRequest connectorTypesRequest = new ConnectorTypesRequest(List.of(new ConnectorTypeRequest("DC_COMBO", "고속")));
        filterService.saveConnectorTypesFilter(connectorTypesRequest);

        // when
        assertThatThrownBy(() -> filterService.saveConnectorTypesFilter(connectorTypesRequest))
                .isInstanceOf(FilterException.class)
                .hasMessage(FilterExceptionType.FILTER_ALREADY_REGISTERED.message());
    }

    @Test
    void 충전_용량을_필터로_저장한다() {
        // given
        CapacitiesRequest capacitiesRequest = new CapacitiesRequest(List.of(BigDecimal.valueOf(2.00)));

        // when
        filterService.saveCapacitiesFilter(capacitiesRequest);

        // then
        List<Capacity> capacities = capacityRepository.findAll();

        assertSoftly(softly -> {
            softly.assertThat(capacities.size()).isEqualTo(1);
            softly.assertThat(capacities.get(0).getCapacity()).isEqualTo(capacitiesRequest.capacities().get(0));
        });
    }

    @Test
    void 충전_용량이_중복되면_예외_발생한다() {
        CapacitiesRequest capacitiesRequest = new CapacitiesRequest(List.of(BigDecimal.valueOf(2.00)));
        filterService.saveCapacitiesFilter(capacitiesRequest);

        // when
        assertThatThrownBy(() -> filterService.saveCapacitiesFilter(capacitiesRequest))
                .isInstanceOf(FilterException.class)
                .hasMessage(FilterExceptionType.FILTER_ALREADY_REGISTERED.message());
    }
}
