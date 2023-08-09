package com.carffeine.carffeine.station.domain.review;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class ReviewRepositoryTest {

    @Autowired
    private ReviewRepository reviewRepository;

    @Test
    void 리뷰를_등록한다(){
        // given
        Review review = Review.builder()
                .stationId("ME101010")
                .memberId(1L)
                .ratings(4)
                .content("덕분에 빠르게 충전했습니다")
                .isUpdated(false)
                .isDeleted(false)
                .build();
        Review savedReview = reviewRepository.save(review);
        Long reviewId = savedReview.getId();

        // when
        Review foundReview = reviewRepository.findById(reviewId);

        // then
        assertThat(foundReview).usingRecursiveComparison()
                .isEqualTo(review);
    }

    @Test
    void 전체_리뷰를_조회한다(){
        // given
        Review review = Review.builder()
                .stationId("ME101010")
                .memberId(1L)
                .ratings(4)
                .content("덕분에 빠르게 충전했습니다")
                .isUpdated(false)
                .isDeleted(false)
                .build();
        reviewRepository.save(review);

        // when
        String stationId = "ME101010";
        List<Review> foundReviews = reviewRepository.findAllByStationId(stationId);

        // then
        assertThat(foundReviews).hasSize(1);
    }
}