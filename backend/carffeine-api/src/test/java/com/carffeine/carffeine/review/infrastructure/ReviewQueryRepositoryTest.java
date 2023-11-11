package com.carffeine.carffeine.review.infrastructure;

import com.carffeine.carffeine.config.QuerydslConfig;
import com.carffeine.carffeine.fixture.station.StationFixture;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.review.domain.Review;
import com.carffeine.carffeine.review.domain.ReviewRepository;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.station.domain.StationRepository;
import com.carffeine.carffeine.review.infrastructure.dto.ReviewResponse;
import com.carffeine.carffeine.review.infrastructure.dto.TotalRatingsResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import static com.carffeine.carffeine.fixture.member.MemberFixture.일반_회원;
import static com.carffeine.carffeine.fixture.review.ReviewFixture.리뷰_13개;
import static com.carffeine.carffeine.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@Import(value = {QuerydslConfig.class, ReviewQueryRepository.class})
@DataJpaTest
class ReviewQueryRepositoryTest {

    @Autowired
    private ReviewQueryRepository reviewQueryRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StationRepository stationRepository;

    private Member member;
    private Station station;
    private Station otherStation;

    @BeforeEach
    void setUp() {
        member = memberRepository.save(일반_회원);
        station = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        otherStation = stationRepository.save(StationFixture.빈_충전소_충전기_0개_사용가능_0개);
    }

    @Test
    void 리뷰_13개_중_첫번째_페이지엔_10개의_리뷰가_있다() {
        // given
        List<Review> reviewList = 리뷰_13개(member).stream()
                .map(it -> reviewRepository.save(it))
                .toList();
        PageRequest pageable = PageRequest.of(0, 10);

        // when
        Page<ReviewResponse> allReviews = reviewQueryRepository.findAllReviews(station.getStationId(), pageable);
        List<ReviewResponse> list = reviewList.stream()
                .sorted(Comparator.comparing(Review::getId).reversed())
                .limit(10)
                .map(it -> new ReviewResponse(it.getId(), it.getMember().getId(), it.getUpdatedAt(), it.getRatings(), it.getContent(), it.getUpdatedAt().isAfter(it.getCreatedAt()), it.isDeleted(), 0))
                .toList();

        // then
        assertSoftly(softly -> {
            softly.assertThat(allReviews).hasSize(10);
            softly.assertThat(allReviews.hasNext()).isTrue();
            softly.assertThat(allReviews.getContent())
                    .usingRecursiveComparison()
                    .ignoringFieldsOfTypes(LocalDateTime.class)
                    .isEqualTo(list);
        });
    }

    @Test
    void 리뷰_13개_중_두번째_페이지엔_3개의_리뷰가_있다() {
        // given
        List<Review> reviewList = 리뷰_13개(member).stream()
                .map(it -> reviewRepository.save(it))
                .toList();
        PageRequest pageRequest = PageRequest.of(1, 10);

        // when
        Page<ReviewResponse> allReviews = reviewQueryRepository.findAllReviews(station.getStationId(), pageRequest);
        List<ReviewResponse> expected = reviewList.stream()
                .limit(3)
                .sorted(Comparator.comparing(Review::getId).reversed())
                .map(it -> new ReviewResponse(it.getId(), it.getMember().getId(), it.getUpdatedAt(), it.getRatings(), it.getContent(), it.getUpdatedAt().isAfter(it.getCreatedAt()), it.isDeleted(), 0))
                .toList();
        // then
        assertSoftly(softly -> {
            softly.assertThat(allReviews).hasSize(3);
            softly.assertThat(allReviews.hasNext()).isFalse();
            softly.assertThat(allReviews.getContent())
                    .usingRecursiveComparison()
                    .ignoringFieldsOfTypes(LocalDateTime.class)
                    .isEqualTo(expected);

        });
    }

    @Test
    void 충전소가_다르면_리뷰도_다르다() {
        // given
        List<Review> reviewList = 리뷰_13개(member).stream()
                .map(it -> reviewRepository.save(it))
                .toList();
        PageRequest pageRequest = PageRequest.of(1, 10);

        // when
        Page<ReviewResponse> allReviews = reviewQueryRepository.findAllReviews(otherStation.getStationId(), pageRequest);
        List<ReviewResponse> expected = reviewList.stream()
                .limit(3)
                .sorted(Comparator.comparing(Review::getId).reversed())
                .map(it -> new ReviewResponse(it.getId(), it.getMember().getId(), it.getUpdatedAt(), it.getRatings(), it.getContent(), it.getUpdatedAt().isAfter(it.getCreatedAt()), it.isDeleted(), 0))
                .toList();
        // then
        assertSoftly(softly -> {
            softly.assertThat(allReviews).hasSize(0);
            softly.assertThat(allReviews.hasNext()).isFalse();

        });
    }

    @Test
    void 통합_별점을_조회한다() {
        // given
        for (Review review : 리뷰_13개(member)) {
            reviewRepository.save(review);
        }

        // when
        TotalRatingsResponse totalRatings = reviewQueryRepository.findTotalRatings(station.getStationId());
        TotalRatingsResponse expected = new TotalRatingsResponse(2.0, 13L);

        // then
        assertThat(totalRatings)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 리뷰가_없으면_평균은_0점0_총_리뷰는_0L을_반환한다() {
        // when
        TotalRatingsResponse totalRatings = reviewQueryRepository.findTotalRatings(station.getStationId());
        TotalRatingsResponse expected = new TotalRatingsResponse(0.0, 0L);

        // then
        assertThat(totalRatings)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }
}
