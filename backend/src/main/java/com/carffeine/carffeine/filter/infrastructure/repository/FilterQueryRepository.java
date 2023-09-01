package com.carffeine.carffeine.filter.infrastructure.repository;

import com.carffeine.carffeine.car.infrastructure.repository.dto.FilterResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.carffeine.carffeine.car.domain.QCarFilter.carFilter;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class FilterQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<FilterResponse> findCarFilters(Long carId) {
        return jpaQueryFactory.select(constructor(FilterResponse.class,
                        carFilter.filter.name,
                        carFilter.filter.filterType
                )).from(carFilter)
                .where(carFilter.id.eq(carId))
                .fetch();
    }
}
