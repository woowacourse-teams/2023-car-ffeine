package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.station.domain.station.Station;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReviewRepository extends Repository<Review, Long> {

    Review save(Review review);

    Optional<Review> findById(Long reviewId);

    Page<Review> findAllByStation(Station station, Pageable pageable);

    void delete(Review review);

    Long countByStation(Station station);

    @Query("SELECT AVG(r.ratings) FROM Review r WHERE r.station = :station")
    Optional<Double> findAverageRatingsByStation(@Param("station") Station station);
}
