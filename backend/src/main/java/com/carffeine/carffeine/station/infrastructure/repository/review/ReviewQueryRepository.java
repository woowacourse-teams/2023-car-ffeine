package com.carffeine.carffeine.station.infrastructure.repository.review;

import com.carffeine.carffeine.station.controller.review.dto.TotalRatingsResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.carffeine.carffeine.station.domain.review.QReview.review;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class ReviewQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public TotalRatingsResponse findTotalRatings(String stationId) {
        return jpaQueryFactory.select(
                        constructor(TotalRatingsResponse.class,
                                review.ratings.avg(),
                                review.id.count()
                        )).from(review)
                .where(review.station.stationId.eq(stationId))
                .fetchOne();
    }
}
