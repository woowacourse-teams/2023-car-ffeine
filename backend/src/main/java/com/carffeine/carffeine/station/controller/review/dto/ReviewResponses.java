package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;
import org.springframework.data.domain.Page;

import java.util.List;

public record ReviewResponses(List<ReviewResponse> reviews, int nextPage) {

    public static final int MAX_PAGE_INDEX = 1;
    public static final int NON_EXISTENT_PAGE = 0;
    public static final int INVALID_PAGE = -1;

    public static ReviewResponses from(Page<Review> reviews) {
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

        int nextPage = 0;
        if (reviews.getNumber() >= reviews.getTotalPages() - MAX_PAGE_INDEX || reviews.getNumber() < NON_EXISTENT_PAGE) {
            nextPage = INVALID_PAGE;
        } else nextPage++;

        return new ReviewResponses(reviewResponses, nextPage);
    }
}
