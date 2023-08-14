package com.carffeine.carffeine.station.service.review.dto;

import javax.validation.constraints.NotNull;

public record CreateReplyRequest(
        @NotNull
        String content
) {
}
