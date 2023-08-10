package com.carffeine.carffeine.station.service.review.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public record CreateReviewRequest(

        @NotNull
        @Min(value = 1)
        @Max(value = 5)
        Integer ratings,

        @NotNull
        @Min(value = 10)
        @Max(value = 200)
        String content
) {
}
