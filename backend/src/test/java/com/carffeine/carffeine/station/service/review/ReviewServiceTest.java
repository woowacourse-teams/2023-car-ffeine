package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.FakeReplyRepository;
import com.carffeine.carffeine.station.domain.review.FakeReviewRepository;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.FakeStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_요청_13개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReviewServiceTest {

    private ReviewService reviewService;
    private ReviewRepository reviewRepository;
    private ReplyRepository replyRepository;
    private StationRepository stationRepository;
    private MemberRepository memberRepository;

    private Station station;
    private Member member;
    private CreateReviewRequest createRequest;
    private CreateReviewRequest createRequest2;
    private CreateReviewRequest updateRequest;

    @BeforeEach
    void before() {
        reviewRepository = new FakeReviewRepository();
        replyRepository = new FakeReplyRepository();
        stationRepository = new FakeStationRepository();
        memberRepository = new FakeMemberRepository();
        reviewService = new ReviewService(reviewRepository, replyRepository, stationRepository, memberRepository);
        station = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        member = memberRepository.save(일반_회원);
        createRequest = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        createRequest2 = new CreateReviewRequest(2, "여기 충전소 좋은 것 같아요");
        updateRequest = new CreateReviewRequest(2, "생각해보니 별로인 듯 합니다");
    }

    @Test
    void 리뷰를_등록한다() {
        // given
        Review expected = Review.builder()
                .station(station)
                .member(member)
                .ratings(createRequest.ratings())
                .content(createRequest.content())
                .isDeleted(false)
                .build();

        // when
        Review review = reviewService.saveReview(createRequest, station.getStationId(), member.getId());

        // then
        assertThat(review).usingRecursiveComparison()
                .ignoringFields("id")
                .ignoringFieldsOfTypes(LocalDateTime.class)
                .isEqualTo(expected);
    }

    @Test
    void 전체_리뷰를_조회한다() {
        // given
        Pageable pageable = Pageable.ofSize(10).withPage(0);

        reviewService.saveReview(createRequest, station.getStationId(), member.getId());
        reviewService.saveReview(createRequest2, station.getStationId(), member.getId());

        // when
        Page<Review> reviews = reviewService.findAllReviews(station.getStationId(), pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(reviews.getContent().get(0).getRatings()).isEqualTo(createRequest2.ratings());
            softly.assertThat(reviews).hasSize(2);
        });

    }

    @Test
    void 충전소의_리뷰가_13개일_경우_첫_페이지엔_10개의_리뷰가_보여진다() {
        // given
        Pageable pageable = Pageable.ofSize(10).withPage(0);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, station.getStationId(), member.getId());
        }

        // when
        Page<Review> reviews = reviewService.findAllReviews(station.getStationId(), pageable);

        // then
        assertSoftly(softly -> {
            assertThat(reviews.getNumber()).isEqualTo(0);
            assertThat(reviews.getNumberOfElements()).isEqualTo(10);
        });
    }

    @Test
    void 충전소의_리뷰가_13개일_경우_두번째_페이지엔_3개의_리뷰가_보여진다() {
        // given
        Pageable pageable = Pageable.ofSize(10).withPage(1);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, station.getStationId(), member.getId());
        }

        // when
        Page<Review> reviews = reviewService.findAllReviews(station.getStationId(), pageable);

        // then
        assertThat(reviews.getNumberOfElements()).isEqualTo(3);
    }

    @Test
    void 충전소의_리뷰가_13개일_경우_세번째_페이지엔_리뷰가_없다() {
        // given
        Pageable pageable = Pageable.ofSize(10).withPage(2);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, station.getStationId(), member.getId());
        }

        // when
        Page<Review> reviews = reviewService.findAllReviews(station.getStationId(), pageable);

        // then
        assertThat(reviews).hasSize(0);
    }

    @Test
    void 리뷰를_수정할_수_있다() {
        // given
        Review review = reviewService.saveReview(createRequest, station.getStationId(), member.getId());

        // when
        Review updatedReview = reviewService.updateReview(updateRequest, review.getId(), member.getId());

        // then
        assertSoftly(softly -> {
            softly.assertThat(updatedReview.getRatings()).isEqualTo(updateRequest.ratings());
            softly.assertThat(updatedReview.getContent()).isEqualTo(updateRequest.content());
        });
    }

    @Test
    void 리뷰를_삭제할_수_있다() {
        // given
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        memberRepository.save(일반_회원);
        Review review = reviewService.saveReview(createRequest, station.getStationId(), member.getId());

        // when
        reviewService.deleteReview(member.getId(), review.getId());
        Review foundReview = reviewService.findReview(review.getId());

        // then
        assertThat(foundReview.isDeleted()).isTrue();
    }

    @Test
    void 평균_별점을_구할_수_있다() {
        // given
        reviewService.saveReview(createRequest, station.getStationId(), member.getId());
        reviewService.saveReview(createRequest2, station.getStationId(), member.getId());

        // when
        double averageRatings = reviewService.findAverageRatings(station.getStationId());

        // then
        assertThat(averageRatings).isEqualTo(3.0);
    }

    @Test
    void 총_리뷰_개수를_구할_수_있다() {
        // given
        reviewService.saveReview(createRequest, station.getStationId(), member.getId());
        reviewService.saveReview(createRequest2, station.getStationId(), member.getId());

        // when
        long totalCount = reviewService.findTotalCount(station.getStationId());

        // then
        assertThat(totalCount).isEqualTo(2);
    }

    @Test
    void 리뷰가_없다면_0점을_반환한다() {
        // when
        double result = reviewService.findAverageRatings(station.getStationId());

        // then
        assertThat(result).isEqualTo(0.0);
    }
}
