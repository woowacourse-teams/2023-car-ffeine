package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_13개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class ReviewRepositoryTest {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 리뷰를_등록한다() {
        // given
        Member member = memberRepository.save(일반_회원);
        Review review = Review.builder()
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(member)
                .ratings(4)
                .content("덕분에 빠르게 충전했습니다")
                .isUpdated(false)
                .isDeleted(false)
                .build();
        Review savedReview = reviewRepository.save(review);
        Long reviewId = savedReview.getId();

        // when
        Review foundReview = reviewRepository.findById(reviewId).get();

        // then
        assertThat(foundReview).usingRecursiveComparison()
                .isEqualTo(review);
    }

    @Test
    void 전체_리뷰를_조회한다() {
        // given
        Member member = memberRepository.save(일반_회원);
        for (Review review : 리뷰_13개(member)) {
            reviewRepository.save(review);
        }

        Station station = 선릉역_충전소_충전기_2개_사용가능_1개;
        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<Review> foundReviews = reviewRepository.findAllByStation(station, pageable);

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(foundReviews.getSize()).isEqualTo(10);
            softly.assertThat(foundReviews.getTotalElements()).isEqualTo(13);
        });
    }
}
