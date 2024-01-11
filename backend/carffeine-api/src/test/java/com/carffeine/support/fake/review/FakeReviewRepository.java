package com.carffeine.support.fake.review;

import com.carffeine.carffeine.review.domain.Review;
import com.carffeine.carffeine.review.domain.ReviewRepository;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.review.exception.ReviewException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.carffeine.carffeine.review.exception.ReviewExceptionType.DELETED_REVIEW;
import static com.carffeine.carffeine.review.exception.ReviewExceptionType.REVIEW_NOT_FOUND;
import static java.util.Comparator.comparing;

public class FakeReviewRepository implements ReviewRepository {

    private static Long id = 1L;

    private final Map<Long, Review> map = new HashMap<>();

    @Override
    public Review save(Review review) {
        Review savedReview = Review.builder()
                .id(id)
                .station(review.getStation())
                .member(review.getMember())
                .ratings(review.getRatings())
                .content(review.getContent())
                .isDeleted(review.isDeleted())
                .build();

        map.put(id++, savedReview);
        return savedReview;
    }

    @Override
    public Optional<Review> findById(Long reviewId) {
        return map.values().stream()
                .filter(it -> it.getId().equals(reviewId))
                .findAny();
    }

    @Override
    public Page<Review> findAllByStation(Station station, Pageable pageable) {
        return new PageImpl<>(map.values().stream()
                .filter(it -> it.getStation().getStationId().equals(station.getStationId()))
                .sorted(comparing(Review::getId).reversed())
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .toList());
    }

    @Override
    public void delete(Review review) {
        Optional<Long> any = map.keySet().stream()
                .filter(it -> map.get(it).getId().equals(review.getId()))
                .findAny();
        if (any.isEmpty()) {
            throw new ReviewException(REVIEW_NOT_FOUND);
        }
        if (map.get(any.get()).isDeleted()) {
            throw new ReviewException(DELETED_REVIEW);
        }
        Review deletedReview = Review.builder()
                .id(any.get())
                .station(review.getStation())
                .member(review.getMember())
                .ratings(review.getRatings())
                .content(review.getContent())
                .isDeleted(true)
                .build();
        map.put(any.get(), deletedReview);
    }
}
