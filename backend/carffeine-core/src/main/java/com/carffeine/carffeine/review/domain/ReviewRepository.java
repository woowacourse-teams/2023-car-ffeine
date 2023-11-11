package com.carffeine.carffeine.review.domain;

import com.carffeine.carffeine.station.domain.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ReviewRepository extends Repository<Review, Long> {

    Review save(Review review);

    Optional<Review> findById(Long reviewId);

    Page<Review> findAllByStation(Station station, Pageable pageable);

    void delete(Review review);
}
