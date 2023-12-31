package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.station.exception.review.ReviewException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원3;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MAX_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_CONTENT_MIN_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_RATINGS_MAX_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.INVALID_RATINGS_MIN_LENGTH;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.UNAUTHORIZED_MEMBER;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReviewTest {

    private Review review;

    @BeforeEach
    void setUp() {
        review = Review.builder()
                .id(2L)
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(일반_회원)
                .ratings(4)
                .content("덕분에 빠르게 충전했습니다")
                .isDeleted(false)
                .build();
    }

    @Test
    void 리뷰를_수정한다() {
        // when
        review.updateReview(4, "리뷰를 수정하고자 합니다");

        // then
        assertSoftly(softly -> {
            softly.assertThat(review.getRatings()).isEqualTo(4);
            softly.assertThat(review.getContent()).isEqualTo("리뷰를 수정하고자 합니다");
        });
    }

    @Test
    void 리뷰_작성자와_편집자가_다르면_예외가_발생한다() {
        // when & then
        assertThatThrownBy(() -> review.validate(일반_회원3))
                .isInstanceOf(ReviewException.class)
                .hasMessage(UNAUTHORIZED_MEMBER.message());
    }

    @ParameterizedTest
    @ValueSource(ints = {-11, -1, 0})
    void 리뷰_등록시_별점이_1보다_작으면_예외가_발생한다(int ratings) {
        // when & then
        assertThatThrownBy(() -> Review.builder()
                .id(2L)
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(일반_회원)
                .ratings(ratings)
                .content("덕분에 빠르게 충전했습니다")
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage(INVALID_RATINGS_MIN_LENGTH.message());
    }

    @ParameterizedTest
    @ValueSource(ints = {6, 7, 100})
    void 리뷰_등록시_별점이_5보다_크면_예외가_발생한다(int ratings) {
        // when & then
        assertThatThrownBy(() -> Review.builder()
                .id(2L)
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(일반_회원)
                .ratings(ratings)
                .content("덕분에 빠르게 충전했습니다")
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage(INVALID_RATINGS_MAX_LENGTH.message());
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "그저 그래요"})
    void 리뷰_등록시_내용이_10자보다_작으면_예외가_발생한다(String content) {
        // when & then
        assertThatThrownBy(() -> Review.builder()
                .id(2L)
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(일반_회원)
                .ratings(4)
                .content(content)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage(INVALID_CONTENT_MIN_LENGTH.message());
    }

    @Test
    void 리뷰_등록시_내용이_200자보다_크면_예외가_발생한다() {
        // given
        String content201 = "*".repeat(201);

        // when & then
        assertThatThrownBy(() -> Review.builder()
                .id(2L)
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(일반_회원)
                .ratings(4)
                .content(content201)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage(INVALID_CONTENT_MAX_LENGTH.message());
    }
}
