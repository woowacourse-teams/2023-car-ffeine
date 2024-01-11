package com.carffeine.carffeine.review.infrastructure.dto;

import java.util.List;

public record ReplyResponses(
        List<ReplyResponse> replies,
        int nextPage
) {
}
