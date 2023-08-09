package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
    void 리뷰_등록시_별점이_없으면_예외가_발생한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(null, "덕분에 빠르게 충전했습니다");

        // then
        assertThatThrownBy(() -> reviewService.saveReview(request, stationId, memberId))
                .isInstanceOf(ReviewException.class)
                .hasMessage("별점은 null이 될 수 없습니다");
    }

    @ParameterizedTest
    @ValueSource(ints = {-1, 0, 6})
    void 리뷰_등록시_별점이_1에서_5사이가_아니면_예외가_발생한다(int ratings) {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(ratings, "덕분에 빠르게 충전했습니다");

        // then
        assertThatThrownBy(() -> reviewService.saveReview(request, stationId, memberId))
                .isInstanceOf(ReviewException.class)
                .hasMessage("별점은 1부터 5사이의 값이어야 합니다");
    }

    @Test
    void 리뷰_등록시_글이_없으면_예외가_발생한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(3, null);

        // then
        assertThatThrownBy(() -> reviewService.saveReview(request, stationId, memberId))
                .isInstanceOf(ReviewException.class)
                .hasMessage("리뷰 내용은 null이 될 수 없습니다");
    }

    @Test
    void 리뷰_등록시_글의_길이가_10미만이면_예외가_발생한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(4, "좋아요");

        // then
        assertThatThrownBy(() -> reviewService.saveReview(request, stationId, memberId))
                .isInstanceOf(ReviewException.class)
                .hasMessage("리뷰 내용은 최소 10자 입니다");
    }

    @Test
    void 리뷰_등록시_글의_길이가_100초과면_예외가_발생한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(4, "이상은 인간에 실로 만천하의 아니다. 대중을 피가 이 보는 심장은 꽃이 역사를 일월과 만천하의 봄바람이다. 피고, 기쁘며, 뼈 길지 속에서 이상이 싸인 황금시대다. 가진 같으며, 풀밭에 이것이다. 보내는 우는 산야에 인생을 부패를 뿐이다. 뜨거운지라, 타오르고 있는 봄바람이다. 뭇 위하여, 역사를 영원히 품었기 것이다. 모래뿐일 것은 부패를 뭇 있으랴? 것은 얼마나 속에 끓는 열락의 것이다. 청춘에서만 생생하며, 영락과 그림자는 힘차게 봄바람이다. 이는 되는 속에서 소리다.이것은 그들의 꽃 끓는다.");

        // then
        assertThatThrownBy(() -> reviewService.saveReview(request, stationId, memberId))
                .isInstanceOf(ReviewException.class)
                .hasMessage("리뷰 내용은 최대 200자 입니다");
    }

    @Test
    void 전쳬_리뷰를_조회한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        int page = 1;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        reviewService.saveReview(request, stationId, memberId);

        // when
        List<Review> reviews = reviewService.findAllReviews(stationId, page);

        // then
        assertThat(reviews).hasSize(1);
    }

    @Test
    void 충전소의_리뷰가_13개일_경우_첫_페이지엔_10개의_리뷰가_보여진다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        int page = 1;

        for (CreateReviewRequest request : 리뷰_13개()) {
            reviewService.saveReview(request, stationId, memberId);
        }

        // when
        List<Review> reviews = reviewService.findAllReviews(stationId, page);

        // then
        assertThat(reviews).hasSize(10);
    }

    @Test
    void 충전소의_리뷰가_13개일_경우_두번째_페이지엔_3개의_리뷰가_보여진다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        int page = 2;

        for (CreateReviewRequest request : 리뷰_13개()) {
            reviewService.saveReview(request, stationId, memberId);
        }

        // when
        List<Review> reviews = reviewService.findAllReviews(stationId, page);

        // then
        assertThat(reviews).hasSize(3);
    }

    @Test
    void 리뷰를_수정할_수_있다() {
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

        Review review = reviewService.saveReview(request, stationId, memberId);

        // when
        long reviewId = review.getId();
        CreateReviewRequest updateRequest = new CreateReviewRequest(2, "생각해보니 별로인 듯 합니다");
        Review updatedReview = reviewService.updateReview(updateRequest, reviewId, memberId);

        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(updatedReview.getRatings()).isEqualTo(updateRequest.ratings());
            softly.assertThat(updatedReview.getContent()).isEqualTo(updateRequest.content());
        });
    }
}