package com.carffeine.carffeine.station.infrastructure.repository.review;

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
public class ReplyQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<ReplyResponse> findAllReplies(Long reviewId, Pageable pageable) {
        QueryResults<ReplyResponse> result = jpaQueryFactory.select(constructor(ReplyResponse.class,
                        reply.id,
                        reply.review.id,
                        reply.member.id,
                        reply.updatedAt,
                        reply.content,
                        reply.updatedAt.after(reply.createdAt),
                        reply.isDeleted))
                .from(reply)
                .innerJoin(review).on(review.id.eq(reviewId))
                .orderBy(reply.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl<>(result.getResults(), pageable, result.getTotal());
    }
}
