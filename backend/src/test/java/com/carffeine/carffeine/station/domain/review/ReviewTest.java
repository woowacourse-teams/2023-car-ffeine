package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.station.exception.review.ReviewException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.선릉역_충전소_리뷰_별4_15글자;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReviewTest {

    @Test
    void 리뷰를_수정한다() {
        // given
        Review review = 선릉역_충전소_리뷰_별4_15글자.get();

        // when
        review.updateReview(4, "리뷰를 수정하고자 합니다");

        // then
        assertSoftly(softly -> {
            softly.assertThat(review.getRatings()).isEqualTo(4);
            softly.assertThat(review.getContent()).isEqualTo("리뷰를 수정하고자 합니다");
        });
    }

    @Test
    void 리뷰를_삭제처리한다() {
        // given
        Review review = 선릉역_충전소_리뷰_별4_15글자.get();

        // when
        review.delete();

        // then
        assertThat(review.isDeleted()).isTrue();
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
                .isUpdated(false)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage("별점은 최소 1점입니다");
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
                .isUpdated(false)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage("별점은 최대 5점입니다");
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
                .isUpdated(false)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage("리뷰 내용은 최소 10자 입니다");
    }

    @ParameterizedTest
    @ValueSource(strings = {"방황하여도, 용감하고 품고 뿐이다. 이는 불어 인생을 가지에 위하여서, 운다. 바이며, 날카로우나 가치를 작고 칼이다. 튼튼하며, 뭇 굳세게 열락의 그들은 쓸쓸하랴? 인도하겠다는 인생을 열매를 부패를 가지에 크고 붙잡아 설산에서 하는 말이다. 용기가 설레는 청춘은 보내는 온갖 같은 뿐이다. 그들에게 긴지라 전인 천고에 무엇을 것이다. 못할 청춘의 청춘 청춘아", "방황하여도, 용감하고 품고 뿐이다. 이는 불어 인생을 가지에 위하여서, 운다. 바이며, 날카로우나 가치를 작고 칼이다. 튼튼하며, 뭇 굳세게 열락의 그들은 쓸쓸하랴? 인도하겠다는 인생을 열매를 부패를 가지에 크고 붙잡아 설산에서 하는 말이다. 용기가 설레는 청춘은 보내는 온갖 같은 뿐이다. 그들에게 긴지라 전인 천고에 무엇을 것이다. 못할 청춘의 청춘 청춘 예찬"})
    void 리뷰_등록시_내용이_200자보다_크면_예외가_발생한다(String content) {
        // when & then
        assertThatThrownBy(() -> Review.builder()
                .id(2L)
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(일반_회원)
                .ratings(4)
                .content(content)
                .isUpdated(false)
                .isDeleted(false)
                .build())
                .isInstanceOf(ReviewException.class)
                .hasMessage("리뷰 내용은 최대 200자 입니다");
    }
}
