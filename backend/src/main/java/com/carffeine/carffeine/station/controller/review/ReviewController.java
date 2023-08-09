package com.carffeine.carffeine.station.controller.review;

import com.carffeine.carffeine.auth.controller.AuthMember;
import com.carffeine.carffeine.station.controller.review.dto.ReviewResponses;
import com.carffeine.carffeine.station.domain.review.Review;
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

    @GetMapping("/stations/{stationId}/reviews")
    public ResponseEntity<ReviewResponses> findReviews(@PathVariable String stationId,
                                                       @RequestParam(value = "page", required = false, defaultValue = "1") int page) {
        List<Review> reviews = reviewService.findAllReviews(stationId, page);
        ReviewResponses responses = ReviewResponses.from(reviews);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/api/reviews/{reviewId}")
    public ResponseEntity<Void> updateReview(
            @AuthMember Long memberId,
            @PathVariable Long reviewId,
            @RequestBody CreateReviewRequest createReviewRequest) {
        reviewService.updateReview(createReviewRequest, reviewId, memberId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/api/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@AuthMember Long memberId, @PathVariable long reviewId) {
        reviewService.deleteReview(memberId, reviewId);
        return ResponseEntity.noContent().build();
    }
}
