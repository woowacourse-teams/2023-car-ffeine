package com.carffeine.carffeine.station.infrastructure.repository.city;

import com.carffeine.carffeine.station.infrastructure.repository.city.dto.CitySearchResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.carffeine.carffeine.station.domain.city.QCity.city;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class CityQueryRepository {

    private static final int LIMIT_SIZE_OF_CITY = 3;

    private final JPAQueryFactory jpaQueryFactory;

    public List<CitySearchResponse> findSearchResult(String query) {
        return jpaQueryFactory
                .select(constructor(CitySearchResponse.class,
                        city.name,
                        city.latitude.value,
                        city.longitude.value
                ))
                .from(city)
                .where(city.name.contains(query))
                .limit(LIMIT_SIZE_OF_CITY)
                .orderBy(city.name.asc())
                .fetch();
    }
}
