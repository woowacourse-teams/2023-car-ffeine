package com.carffeine.carffeine.station.infrastructure.repository.review;

import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReviewResponse;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.TotalRatingsResponse;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import static com.carffeine.carffeine.station.domain.review.QReply.reply;
import static com.carffeine.carffeine.station.domain.review.QReview.review;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class ReviewQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<ReviewResponse> findAllReviews(String stationId, Pageable pageable) {
        QueryResults<ReviewResponse> result = jpaQueryFactory.select(constructor(ReviewResponse.class,
                        review.id,
                        review.member.id,
                        review.updatedAt,
                        review.ratings,
                        review.content,
                        review.updatedAt.after(review.createdAt),
                        review.isDeleted,
                        reply.count()))
                .from(review)
                .leftJoin(reply).on(review.eq(reply.review))
                .where(review.station.stationId.eq(stationId))
                .orderBy(review.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .groupBy(review)
                .fetchResults();
        return new PageImpl<>(result.getResults(), pageable, result.getTotal());
    }

    public TotalRatingsResponse findTotalRatings(String stationId) {
        return jpaQueryFactory.select(
                        constructor(TotalRatingsResponse.class,
                                review.ratings.avg().coalesce(0.0),
                                review.id.count().coalesce(0L)
                        )).from(review)
                .where(review.station.stationId.eq(stationId))
                .fetchOne();
    }
}
