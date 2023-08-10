package com.carffeine.carffeine.station.service.review.dto;

import javax.validation.constraints.NotNull;

public record CreateReviewRequest(

        @NotNull
        Integer ratings,

        @NotNull
        String content
) {
}
