package com.carffeine.carffeine.station.controller.review;

import com.carffeine.carffeine.auth.controller.AuthMember;
import com.carffeine.carffeine.station.service.review.ReviewService;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/stations/{stationId}/review")
    public ResponseEntity<Void> saveReview(
            @AuthMember Long memberId,
            @PathVariable String stationId,
            @RequestBody CreateReviewRequest createReviewRequest) {
        reviewService.saveReview(createReviewRequest, stationId, memberId);
        return ResponseEntity.noContent().build();
    }
}
