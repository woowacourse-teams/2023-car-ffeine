package com.carffeine.carffeine.station.infrastructure.repository.review.dto;

import java.time.LocalDateTime;

public record ReplyResponse(
        Long replyId,
        Long reviewId,
        Long memberId,
        LocalDateTime latestUpdateDate,
        String content,
        boolean isUpdated,
        boolean isDeleted
) {
}
