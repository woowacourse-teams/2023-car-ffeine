package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;
import org.springframework.data.domain.Page;

import java.util.List;

public record ReviewResponses(
        List<ReviewResponse> reviews,
        int nextPage
) {

    public static final int INVALID_PAGE = -1;
    public static final int NEXT_PAGE = 1;
    public static final String CONTENT_DELETED = "삭제된 글입니다";

    public static ReviewResponses from(Page<Review> reviews) {
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(it -> {
                    String content = it.isDeleted() ? CONTENT_DELETED : it.getContent();
                    return new ReviewResponse(
                            it.getId(),
                            it.getMember().getId(),
                            it.getUpdatedAt(),
                            it.getRatings(),
                            content,
                            it.getUpdatedAt().isAfter(it.getCreatedAt()),
                            it.isDeleted(),
                            it.getReplySize()
                    );
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
