package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReviewQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.TotalRatingsResponse;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@SpringBootTest
class ReviewQueryServiceTest {

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
    void 충전소에_등록된_리뷰의_평균과_총_개수를_조회한다() {
        // given
        reviewService.saveReview(createRequest, station.getStationId(), member.getId());

        // when
        TotalRatingsResponse totalRatings = reviewQueryService.findTotalRatings(station.getStationId());

        // then
        assertThat(totalRatings)
                .usingRecursiveComparison()
                .isEqualTo(new TotalRatingsResponse(4.0, 1L));
    }

    @Test
    void 충전소에_등록된_리뷰가_없으면_평균0과_총_개수0이_조회된다() {
        // when
        TotalRatingsResponse totalRatings = reviewQueryService.findTotalRatings(station.getStationId());

        // then
        assertThat(totalRatings)
                .usingRecursiveComparison()
                .isEqualTo(new TotalRatingsResponse(0.0, 0L));
    }
}
