package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public record ReviewResponses(
        List<ReviewResponse> reviews,
        int nextPage
) {

    public static final int INVALID_PAGE = -1;
    public static final int NEXT_PAGE = 1;

    public static ReviewResponses of(Page<Review> reviews, Map<Long, Long> replyCounts) {
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(it -> {
                    if (it.isDeleted()) {
                        return ReviewResponse.deleted(it, replyCounts.get(it.getId()));
                    }
                    return new ReviewResponse(
                            it.getId(),
                            it.getMember().getId(),
                            it.getUpdatedAt(),
                            it.getRatings(),
                            it.getContent(),
                            it.getUpdatedAt().isAfter(it.getCreatedAt()),
                            false,
                            replyCounts.get(it.getId()));
                }).toList();
        int nextPage = getNextPage(reviews);

        return new ReviewResponses(reviewResponses, nextPage);
    }

    private static int getNextPage(Page<Review> reviews) {
        if (reviews.isLast()) {
            return INVALID_PAGE;
        }
        return reviews.getNumber() + NEXT_PAGE;
    }
}
