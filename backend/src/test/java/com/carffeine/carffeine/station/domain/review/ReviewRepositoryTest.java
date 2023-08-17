package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_13개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.저장_전_리뷰;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.저장_전_리뷰2;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
class ReviewRepositoryTest {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StationRepository stationRepository;

    private Member member;
    private Station station;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        member = memberRepository.save(일반_회원);
        pageable = PageRequest.of(0, 10, Sort.by("id").descending());
        station = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
    }
    @Test
    void 리뷰를_등록한다() {
        // given
        Review review = Review.builder()
                .station(선릉역_충전소_충전기_2개_사용가능_1개)
                .member(member)
                .ratings(4)
                .content("덕분에 빠르게 충전했습니다")
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
        for (Review review : 리뷰_13개(member)) {
            reviewRepository.save(review);
        }

        // when
        Page<Review> foundReviews = reviewRepository.findAllByStation(station, pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(foundReviews.getSize()).isEqualTo(10);
            softly.assertThat(foundReviews.getTotalElements()).isEqualTo(13);
        });
    }

    @Test
    void 리뷰를_삭제한다() {
        // given
        Review review = reviewRepository.save(저장_전_리뷰(member));
        reviewRepository.save(저장_전_리뷰2(member));

        // when
        reviewRepository.delete(review);
        Page<Review> 삭제_전_리뷰들 = reviewRepository.findAllByStation(station, pageable);

        // then
        assertThat(삭제_전_리뷰들.getContent().get(1).isDeleted()).isTrue();
    }

    @Test
    void 평균_별점을_구한다() {
        // given
        for (Review review : 리뷰_13개(member)) {
            reviewRepository.save(review);
        }

        // when
        Double averageRatings = reviewRepository.findAverageRatingsByStation(station).get();

        // then
        assertThat(averageRatings).isEqualTo(2.0);
    }

    @Test
    void 리뷰의_총_개수를_구한다() {
        // given
        for (Review review : 리뷰_13개(member)) {
            reviewRepository.save(review);
        }

        // when
        long count = reviewRepository.countByStation(station);

        // then
        assertThat(count).isEqualTo(13);
    }
}
