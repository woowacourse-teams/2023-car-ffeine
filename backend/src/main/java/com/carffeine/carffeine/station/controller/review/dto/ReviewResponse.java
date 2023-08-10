package com.carffeine.carffeine.station.controller.review.dto;

import com.carffeine.carffeine.station.domain.review.Review;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ReviewResponse(Long reviewId,
                             Long memberId,
                             LocalDateTime latestUpdateDate,
                             long ratings,
                             String content,
                             boolean isUpdated,
                             boolean isDeleted) {
}
