package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.station.controller.review.dto.ReviewResponse;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.exception.review.ReviewExceptionType;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {

    public static final int MIN_RATINGS = 1;
    public static final int MAX_RATINGS = 5;
    public static final int MIN_CONTENT = 10;
    public static final int MAX_CONTENT = 200;
    public static final int REVIEW_LIMIT = 10;

    private final ReviewRepository reviewRepository;

    public Review saveReview(CreateReviewRequest request, String stationId, Long memberId) {
        validateRequest(request);
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

    private void validateRequest(CreateReviewRequest request) {
        validateRatings(request.ratings());
        validateContent(request.content());
    }

    private void validateRatings(Integer ratings) {
        if (ratings == null) {
            throw new ReviewException(ReviewExceptionType.INVALID_RATINGS_NOTNULL);
        }

        if (ratings < MIN_RATINGS || ratings > MAX_RATINGS) {
            throw new ReviewException(ReviewExceptionType.INVALID_RATINGS_SCOPE);
        }
    }

    private void validateContent(String content) {
        if (content == null) {
            throw new ReviewException(ReviewExceptionType.INVALID_CONTENT_NOTNULL);
        }

        if (content.length() < MIN_CONTENT) {
            throw new ReviewException(ReviewExceptionType.INVALID_CONTENT_MIN_LENGTH);
        }

        if (content.length() > MAX_CONTENT) {
            throw new ReviewException(ReviewExceptionType.INVALID_CONTENT_MAX_LENGTH);
        }
    }

    public List<Review> findAllReviews(String stationId, int page) {
        List<Review> allByStationId = reviewRepository.findAllByStationId(stationId);
        return reviewsByPage(allByStationId, page);
    }

    private List<Review> reviewsByPage(List<Review> reviews, int page) {
        return reviews.stream()
                .skip((long) (page - 1) * REVIEW_LIMIT)
                .limit(REVIEW_LIMIT)
                .toList();
    }
}
