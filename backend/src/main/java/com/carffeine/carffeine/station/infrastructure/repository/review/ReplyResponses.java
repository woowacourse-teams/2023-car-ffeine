package com.carffeine.carffeine.station.infrastructure.repository.review;

import java.util.List;

public record ReplyResponses(
        List<ReplyResponse> replies,
        int nextPage
) {
}
