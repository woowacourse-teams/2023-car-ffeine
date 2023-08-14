package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Reply;
import org.springframework.data.domain.Page;

import java.util.List;

public record ReplyResponses(
        List<ReplyResponse> replies,
        int nextPage
) {

    public static final int INVALID_PAGE = -1;
    public static final int NEXT_PAGE = 1;
    public static final String CONTENT_DELETED = "삭제된 글입니다";

    public static ReplyResponses from(Page<Reply> replies) {
        List<ReplyResponse> replyResponses = replies.stream()
                .map(it -> {
                    String content = it.isDeleted() ? CONTENT_DELETED : it.getContent();
                    return new ReplyResponse(
                            it.getId(),
                            it.getReview().getId(),
                            it.getMember().getId(),
                            it.getUpdatedAt(),
                            content,
                            it.getUpdatedAt().isAfter(it.getCreatedAt()),
                            it.isDeleted()
                    );
                }).toList();
        int nextPage = getNextPage(replies);

        return new ReplyResponses(replyResponses, nextPage);
    }

    private static int getNextPage(Page<Reply> replies) {
        if (replies.isLast()) {
            return INVALID_PAGE;
        }
        return replies.getNumber() + NEXT_PAGE;
    }
}
