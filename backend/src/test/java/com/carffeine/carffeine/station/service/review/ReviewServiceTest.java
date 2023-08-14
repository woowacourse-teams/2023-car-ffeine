package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.FakeReviewRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.FakeStationRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.assertj.core.api.SoftAssertions;
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

    @BeforeEach
    void before() {
        reviewRepository = new FakeReviewRepository();
        replyRepository = new FakeReplyRepository();
        stationRepository = new FakeStationRepository();
        memberRepository = new FakeMemberRepository();
        reviewService = new ReviewService(reviewRepository, replyRepository, stationRepository, memberRepository);
    }

    @Test
    void 리뷰를_등록한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        Station station = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        Member member = memberRepository.save(일반_회원);

        Review expected = Review.builder()
                .station(station)
                .member(member)
                .ratings(request.ratings())
                .content(request.content())
                .isDeleted(false)
                .build();

        // when
        Review review = reviewService.saveReview(request, stationId, memberId);

        // then
        assertThat(review).usingRecursiveComparison()
                .ignoringFields("id")
                .ignoringFieldsOfTypes(LocalDateTime.class)
                .isEqualTo(expected);
    }

    @Test
    void 전체_리뷰를_조회한다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        Pageable pageable = Pageable.ofSize(10).withPage(0);
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        memberRepository.save(일반_회원);

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
        int page = 0;
        Pageable pageable = Pageable.ofSize(10).withPage(page);
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        memberRepository.save(일반_회원);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, stationId, memberId);
        }

        // when
        Page<Review> reviews = reviewService.findPageReviews(stationId, pageable);

        // then
        SoftAssertions.assertSoftly(softly -> {
            assertThat(reviews.getNumber()).isEqualTo(page);
            assertThat(reviews.getNumberOfElements()).isEqualTo(10);
        });
    }

    @Test
    void 충전소의_리뷰가_13개일_경우_두번째_페이지엔_3개의_리뷰가_보여진다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        Pageable pageable = Pageable.ofSize(10).withPage(1);
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        memberRepository.save(일반_회원);

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
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        memberRepository.save(일반_회원);

        for (CreateReviewRequest request : 리뷰_요청_13개()) {
            reviewService.saveReview(request, stationId, memberId);
        }

        // when
        Page<Review> reviews = reviewService.findAllReviews(stationId, pageable);

        // then
        assertThat(reviews).hasSize(0);
    }

    @Test
    void 리뷰를_수정할_수_있다() {
        // given
        String stationId = "ME101010";
        Long memberId = 1L;
        CreateReviewRequest request = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        memberRepository.save(일반_회원);

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
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        memberRepository.save(일반_회원);

        Review review = reviewService.saveReview(request, stationId, memberId);

        // when
        Review deletedReview = reviewService.deleteReview(memberId, review.getId());

        // then
        assertThat(deletedReview.isDeleted()).isTrue();
    }
}
