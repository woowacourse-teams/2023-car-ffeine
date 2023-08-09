package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;

import java.util.List;

public record ReviewResponses(List<ReviewResponse> reviews) {

    public static ReviewResponses from(List<Review> reviews) {
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(it -> new ReviewResponse(
                        it.getId(),
                        it.getMemberId(),
                        it.getUpdatedAt(),
                        it.getRatings(),
                        it.getContent(),
                        it.isUpdated(),
                        it.isDeleted()
                )).toList();
        return new ReviewResponses(reviewResponses);
    }
}
