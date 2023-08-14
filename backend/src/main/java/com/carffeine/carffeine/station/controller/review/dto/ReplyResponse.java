package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Reply;

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

    public static ReplyResponse deleted(Reply reply) {
        return new ReplyResponse(reply.getId(), null, null, null, null, true, true);
    }
}
