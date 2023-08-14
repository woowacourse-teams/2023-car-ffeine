package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;

import java.time.LocalDateTime;

public record ReviewResponse(
        Long reviewId,
        Long memberId,
        LocalDateTime latestUpdateDate,
        int ratings,
        String content,
        boolean isUpdated,
        boolean isDeleted,
        long replySize) {

    public static ReviewResponse deleted(Review review, long replySize) {
        return new ReviewResponse(
                review.getId(),
                null,
                null,
                0,
                null,
                true,
                true,
                replySize);
    }
}
