package com.carffeine.carffeine.station.domain.review;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface ReviewRepository extends Repository<Review, Long> {

    Review save(Review review);

    Review findById(Long reviewId);

    List<Review> findAllByStationId(String stationId);
}
