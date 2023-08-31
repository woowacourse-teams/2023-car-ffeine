package com.carffeine.carffeine.station.infrastructure.repository.review;

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
}
