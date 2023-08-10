package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.station.controller.review.dto.ReviewResponse;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.exception.review.ReviewExceptionType;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public Review saveReview(CreateReviewRequest request, String stationId, Long memberId) {
        Review review = Review.builder()
                .stationId(stationId)
                .memberId(memberId)
                .ratings(request.ratings())
                .content(request.content())
                .isUpdated(false)
                .isDeleted(false)
                .build();
        return reviewRepository.save(review);
    }

    public Page<Review> findAllReviews(String stationId, Pageable pageable) {
        return reviewRepository.findAllByStationId(stationId, pageable);
    }

    public Review updateReview(CreateReviewRequest request, Long reviewId, Long memberId) {
        Review review = reviewRepository.findById(reviewId).get();
        validateMember(review, memberId);
        review.updateReview(request.ratings(), request.content());

        return review;
    }

    private void validateMember(Review review, Long memberId) {
        if (!review.getMemberId().equals(memberId)) {
            throw new ReviewException(ReviewExceptionType.UNAUTHORIZED_MEMBER);
        }
    }

    public Review deleteReview(Long memberId, long reviewId) {
        Review review = reviewRepository.findById(reviewId).get();
        validateMember(review, memberId);
        review.delete();

        return review;
    }
}
