package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.fixture.review.ReviewFixture;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_요청_13개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReviewServiceTest extends IntegrationTest {

    @Autowired
    private ReviewService reviewService;

    @Test
    void 리뷰를_등록한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");

        Review expected = Review.builder()
                .stationId(stationId)
                .memberId(memberId)
                .ratings(request.ratings())
                .content(request.content())
                .isUpdated(false)
                .isDeleted(false)
                .build();

        // when
        Review review = reviewService.saveReview(request, stationId, memberId);

        // then
        assertThat(review).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(expected);
    }

    @Test
    void 전쳬_리뷰를_조회한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        Pageable pageable = Pageable.ofSize(10).withPage(0);
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        reviewService.saveReview(request, stationId, memberId);

        // when
        Page<Review> reviews = reviewService.findPageReviews(stationId, pageable);

        // then
        assertThat(reviews).hasSize(1);

    }

    @Test
    void 충전소의_리뷰가_13개일_경우_첫_페이지엔_10개의_리뷰가_보여진다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        Pageable pageable = Pageable.ofSize(10).withPage(0);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, stationId, memberId);
        }

        // when
        Page<Review> reviews = reviewService.findPageReviews(stationId, pageable);

        // then
        assertThat(reviews.getNumberOfElements()).isEqualTo(10);
    }

    @Test
    void 충전소의_리뷰가_13개일_경우_두번째_페이지엔_3개의_리뷰가_보여진다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        Pageable pageable = Pageable.ofSize(10).withPage(1);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, stationId, memberId);
        }

        // when
        Page<Review> reviews = reviewService.findPageReviews(stationId, pageable);

        // then
        assertThat(reviews.getNumberOfElements()).isEqualTo(3);
    }

    @Test
    void 충전소의_리뷰가_13개일_경우_세번째_페이지엔_리뷰가_없다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        Pageable pageable = Pageable.ofSize(10).withPage(2);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, stationId, memberId);
        }

        // when
        Page<Review> reviews = reviewService.findPageReviews(stationId, pageable);

        // then
        assertThat(reviews.get().count()).isEqualTo(0);
    }

    @Test
    void 리뷰를_수정할_수_있다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");

        Review review = reviewService.saveReview(request, stationId, memberId);

        // when
        long reviewId = review.getId();
        CreateReviewRequest updateRequest = new CreateReviewRequest(2, "생각해보니 별로인 듯 합니다");
        Review updatedReview = reviewService.updateReview(updateRequest, reviewId, memberId);

        // then
        assertSoftly(softly -> {
            softly.assertThat(updatedReview.getRatings()).isEqualTo(updateRequest.ratings());
            softly.assertThat(updatedReview.getContent()).isEqualTo(updateRequest.content());
        });
    }

    @Test
    void 리뷰를_삭제한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");

        Review review = reviewService.saveReview(request, stationId, memberId);

        // when
        Review deletedReview = reviewService.deleteReview(memberId, review.getId());

        // then
        assertThat(deletedReview.isDeleted()).isTrue();
    }
}