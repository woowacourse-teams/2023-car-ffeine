package com.carffeine.carffeine.filter.fixture;

import com.carffeine.carffeine.filter.domain.Filter;
import com.carffeine.carffeine.filter.domain.FilterType;

public class FilterFixture {

    public static Filter createCompanyFilter() {
        return Filter.of("HG", FilterType.COMPANY.getName());
    }

    public static Filter createCapacityFilter() {
        return Filter.of("2.00", FilterType.CAPACITY.getName());
    }

    public static Filter createConnectorTypeFilter() {
        return Filter.of("DC_COMBO", FilterType.CONNECTOR_TYPE.getName());
    }
}
