package com.carffeine.carffeine.station.domain.review;

import org.springframework.data.repository.Repository;

public interface ReviewRepository extends Repository<Review, Long> {

    Review save(Review review);

    Review findById(Long reviewId);
}
