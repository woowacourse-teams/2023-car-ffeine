package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ReviewResponse(Long reviewId,
                             Long memberId,
                             LocalDateTime latestUpdateDate,
                             int ratings,
                             String content,
                             boolean isUpdated,
                             boolean isDeleted) {

    public static ReviewResponse from(Review review){
        return ReviewResponse.builder()
                .reviewId(review.getId())
                .memberId(review.getMemberId())
                .latestUpdateDate(review.getUpdatedAt())
                .ratings(review.getRatings())
                .content(review.getContent())
                .isUpdated(review.isUpdated())
                .isDeleted(review.isDeleted())
                .build();
    }
}
