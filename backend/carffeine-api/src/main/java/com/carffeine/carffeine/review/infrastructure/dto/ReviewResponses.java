package com.carffeine.carffeine.review.infrastructure.dto;

import java.util.List;

public record ReviewResponses(
        List<ReviewResponse> reviews,
        int nextPage
) {
}
