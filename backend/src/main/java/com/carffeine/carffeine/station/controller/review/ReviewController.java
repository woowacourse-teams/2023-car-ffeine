package com.carffeine.carffeine.station.controller.review;

import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReviewResponses;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.TotalRatingsResponse;
import com.carffeine.carffeine.station.service.review.ReviewQueryService;
import com.carffeine.carffeine.station.service.review.ReviewService;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.springframework.data.domain.Sort.Direction.DESC;

@RequiredArgsConstructor
@RestController
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewQueryService reviewQueryService;

    @PostMapping("/stations/{stationId}/reviews")
    public ResponseEntity<Void> saveReview(
            @AuthMember Long memberId,
            @PathVariable String stationId,
            @Valid @RequestBody CreateReviewRequest createReviewRequest) {
        reviewService.saveReview(createReviewRequest, stationId, memberId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stations/{stationId}/reviews")
    public ResponseEntity<ReviewResponses> findReviews(
            @PathVariable String stationId,
            @PageableDefault(sort = "id", direction = DESC) Pageable pageable) {
        return ResponseEntity.ok(reviewQueryService.findAllReviews(stationId, pageable));
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> updateReview(
            @AuthMember Long memberId,
            @PathVariable Long reviewId,
            @RequestBody CreateReviewRequest createReviewRequest) {
        reviewService.updateReview(createReviewRequest, reviewId, memberId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @AuthMember Long memberId,
            @PathVariable Long reviewId) {
        reviewService.deleteReview(memberId, reviewId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stations/{stationId}/total-ratings")
    public ResponseEntity<TotalRatingsResponse> findTotalRatings(
            @PathVariable String stationId) {
        return ResponseEntity.ok(reviewQueryService.findTotalRatings(stationId));
    }
}
