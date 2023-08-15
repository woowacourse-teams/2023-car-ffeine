package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.station.domain.station.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
                .sorted(comparing(Review::getId))
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .toList());
    }

    @Override
    public Double findAverageRatingsByStation(Station station) {
        return map.values().stream()
                .filter(it -> it.getStation().getStationId().equals(station.getStationId()))
                .mapToDouble(Review::getRatings)
                .average()
                .orElse(0.0);
    }

    @Override
    public Long countByStation(Station station) {
        return map.values().stream()
                .filter(it -> it.getStation().getStationId().equals(station.getStationId()))
                .count();
    }
}
