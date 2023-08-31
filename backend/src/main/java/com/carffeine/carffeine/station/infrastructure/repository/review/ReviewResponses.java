package com.carffeine.carffeine.station.infrastructure.repository.review;

import java.util.List;

public record ReviewResponses(
        List<ReviewResponse> reviews,
        int nextPage
) {
}
