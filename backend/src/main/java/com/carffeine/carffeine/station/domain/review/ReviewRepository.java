package com.carffeine.carffeine.station.domain.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ReviewRepository extends Repository<Review, Long> {

    Review save(Review review);

    Optional<Review> findById(Long reviewId);

    Page<Review> findAllByStationId(String stationId, Pageable pageable);
}
