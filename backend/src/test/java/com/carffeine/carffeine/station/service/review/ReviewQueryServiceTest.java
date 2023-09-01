package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReviewResponse;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReviewResponses;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.TotalRatingsResponse;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReviewQueryServiceTest extends IntegrationTest {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ReviewQueryRepository reviewQueryRepository;
    private ReviewService reviewService;
    private ReviewQueryService reviewQueryService;
    private Station station;
    private Member member;
    private CreateReviewRequest createRequest;

    @BeforeEach
    void before() {
        station = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        member = memberRepository.save(일반_회원);
        createRequest = new CreateReviewRequest(4, "덕분에 빠르게 충전했습니다");
        reviewQueryService = new ReviewQueryService(reviewQueryRepository);
        reviewService = new ReviewService(reviewRepository, replyRepository, stationRepository, memberRepository);
    }

    @Test
    void 충전소의_리뷰들을_조회한다(){
        // given
        reviewService.saveReview(createRequest, station.getStationId(),member.getId());
        PageRequest pageable = PageRequest.of(0, 10);

        // when
        ReviewResponses reviews = reviewQueryService.findAllReviews(station.getStationId(), pageable);
        ReviewResponse expected = new ReviewResponse(1L, member.getId(), null, 4, "덕분에 빠르게 충전했습니다", false, false, 0);

        // then
        assertSoftly(softly -> {
                softly.assertThat(reviews.reviews()).hasSize(1);
                softly.assertThat(reviews.reviews().get(0))
                        .usingRecursiveComparison()
                        .ignoringFieldsOfTypes(LocalDateTime.class)
                        .isEqualTo(expected);
        });
    }

    @Test
    void 충전소의_13개_리뷰들_중_첫번째_페이지를_조회한다(){
        // given
        for (int i = 0; i < 13; i++) {
            reviewService.saveReview(createRequest, station.getStationId(),member.getId());
        }
        PageRequest pageable = PageRequest.of(0, 10);

        // when
        ReviewResponses reviews = reviewQueryService.findAllReviews(station.getStationId(), pageable);

        // then
        assertSoftly(softly -> {
                softly.assertThat(reviews.reviews()).hasSize(10);
                softly.assertThat(reviews.nextPage()).isEqualTo(1);
        });
    }

    @Test
    void 충전소의_13개_리뷰들_중_마지막_페이지를_조회한다(){
        // given
        for (int i = 0; i < 13; i++) {
            reviewService.saveReview(createRequest, station.getStationId(),member.getId());
        }
        PageRequest pageable = PageRequest.of(1, 10);

        // when
        ReviewResponses reviews = reviewQueryService.findAllReviews(station.getStationId(), pageable);

        // then
        assertSoftly(softly -> {
                softly.assertThat(reviews.reviews()).hasSize(3);
                softly.assertThat(reviews.nextPage()).isEqualTo(-1);
        });
    }

    @Test
    void 충전소에_등록된_리뷰의_평균과_총_개수를_조회한다() {
        // given
        reviewService.saveReview(createRequest, station.getStationId(), member.getId());

        // when
        TotalRatingsResponse totalRatings = reviewQueryService.findTotalRatings(station.getStationId());
        TotalRatingsResponse expected = new TotalRatingsResponse(4.0, 1L);

        // then
        assertThat(totalRatings)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 충전소에_등록된_리뷰가_없으면_평균0과_총_개수0이_조회된다() {
        // when
        TotalRatingsResponse totalRatings = reviewQueryService.findTotalRatings(station.getStationId());
        TotalRatingsResponse expected = new TotalRatingsResponse(0.0, 0L);

        // then
        assertThat(totalRatings)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }
}
