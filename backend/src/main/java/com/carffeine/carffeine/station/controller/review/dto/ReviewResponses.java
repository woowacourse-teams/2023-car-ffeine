package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;
import org.springframework.data.domain.Page;

import java.util.List;

public record ReviewResponses(
        List<ReviewResponse> reviews,
        int nextPage
) {

    public static ReviewResponses of(Page<Review> reviews, int nextPage) {
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(it -> new ReviewResponse(
                        it.getId(),
                        it.getMember().getId(),
                        it.getUpdatedAt(),
                        it.getRatings(),
                        it.getContent(),
                        it.isUpdated(),
                        it.isDeleted()
                )).toList();

        return new ReviewResponses(reviewResponses, nextPage);
    }
}
