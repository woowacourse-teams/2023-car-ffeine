package com.carffeine.carffeine.review.integration;

import com.carffeine.carffeine.auth.infrastructure.JwtProvider;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import com.carffeine.carffeine.review.domain.Review;
import com.carffeine.carffeine.review.domain.ReviewRepository;
import com.carffeine.carffeine.review.infrastructure.dto.ReviewResponses;
import com.carffeine.carffeine.review.infrastructure.dto.TotalRatingsResponse;
import com.carffeine.carffeine.station.domain.Station;
import com.carffeine.carffeine.station.domain.StationRepository;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import com.carffeine.support.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

import static com.carffeine.carffeine.fixture.member.MemberFixture.일반_회원;
import static com.carffeine.carffeine.fixture.review.ReviewFixture.리뷰_별4_15글자;
import static com.carffeine.carffeine.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.review.integration.ReviewIntegrationTestFixture.댓글을_등록한다;
import static com.carffeine.carffeine.review.integration.ReviewIntegrationTestFixture.댓글을_삭제한다;
import static com.carffeine.carffeine.review.integration.ReviewIntegrationTestFixture.댓글을_수정한다;
import static com.carffeine.carffeine.review.integration.ReviewIntegrationTestFixture.댓글을_조회한다;
import static com.carffeine.carffeine.review.integration.ReviewIntegrationTestFixture.통합_별점을_조회한다;
import static com.carffeine.support.AcceptanceTestFixture.값이_같은지_비교한다;
import static com.carffeine.support.AcceptanceTestFixture.상태_코드를_검증한다;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class ReviewIntegrationTest extends IntegrationTest {

    private Station 충전소;
    private Member 멤버;
    private CreateReviewRequest 요청;
    private String 토큰;
    private String 잘못된_토큰;
    private Review 리뷰;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private JwtProvider jwtProvider;

    @BeforeEach
    void setUp() {
        충전소 = stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        멤버 = memberRepository.save(일반_회원);
        요청 = new CreateReviewRequest(3, "asdasdasdasdadada");
        토큰 = jwtProvider.create(멤버.getId());
        잘못된_토큰 = jwtProvider.create(123L);
        리뷰 = reviewRepository.save(리뷰_별4_15글자);
    }

    @Nested
    class 충전소의_리뷰를_조회할_때 {

        @Test
        void 정상_응답한다() {
            // when
            댓글을_등록한다(요청, 토큰, 충전소);
            var 조회_응답 = 댓글을_조회한다(충전소);

            // then
            상태_코드를_검증한다(조회_응답, OK);
        }
    }

    @Nested
    class 충전소에_댓글을_등록할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            // when
            var 등록_응답 = 댓글을_등록한다(요청, 토큰, 충전소);
            var 응답 = 댓글을_조회한다(충전소).as(ReviewResponses.class);
            var 최근_댓글 = 응답.reviews().get(0);

            // then
            assertSoftly(softly -> {
                상태_코드를_검증한다(등록_응답, NO_CONTENT);
                값이_같은지_비교한다(최근_댓글.ratings(), 요청.ratings());
                값이_같은지_비교한다(최근_댓글.content(), 요청.content());
            });
        }

        @Test
        void 인증되지_않은_멤버일_경우_예외가_발생한다() {
            // when
            var 등록_응답 = 댓글을_등록한다(요청, 잘못된_토큰, 충전소);

            // then
            상태_코드를_검증한다(등록_응답, NOT_FOUND);
        }
    }

    @Nested
    class 충전소의_댓글을_수정할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);
            CreateReviewRequest 수정_요청_1개 = new CreateReviewRequest(4, "리뷰를 수정하고자 합니다");

            // when
            var 수정_응답 = 댓글을_수정한다(수정_요청_1개, 토큰, 리뷰);
            var 응답 = 댓글을_조회한다(충전소).as(ReviewResponses.class);
            var 해당_댓글 = 응답.reviews().stream()
                    .filter(it -> Objects.equals(it.reviewId(), 멤버.getId()))
                    .findAny()
                    .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND));

            // then
            assertSoftly(softly -> {
                상태_코드를_검증한다(수정_응답, NO_CONTENT);
                값이_같은지_비교한다(해당_댓글.ratings(), 수정_요청_1개.ratings());
                값이_같은지_비교한다(해당_댓글.content(), 수정_요청_1개.content());
            });
        }

        @Test
        void 등록되지_않은_멤버일_경우_예외가_발생한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);
            CreateReviewRequest 수정_요청_1개 = new CreateReviewRequest(4, "리뷰를 수정하고자 합니다");

            // when
            var 수정_응답 = 댓글을_수정한다(수정_요청_1개, 잘못된_토큰, 리뷰);

            // then
            상태_코드를_검증한다(수정_응답, NOT_FOUND);
        }
    }

    @Nested
    class 충전소의_댓글을_삭제할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var 삭제_응답 = 댓글을_삭제한다(토큰, 리뷰);

            // then
            상태_코드를_검증한다(삭제_응답, NO_CONTENT);
        }

        @Test
        void 등록되지_않은_멤버일_경우_예외가_발생한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var 삭제_응답 = 댓글을_삭제한다(잘못된_토큰, 리뷰);

            // then
            상태_코드를_검증한다(삭제_응답, NOT_FOUND);
        }
    }

    @Nested
    class 충전소의_통합_별점을_조회할_때 {

        @Test
        void 정상_응답한다() {
            // when
            댓글을_등록한다(요청, 토큰, 충전소);
            var 통합_별점_조회_응답 = 통합_별점을_조회한다(충전소);
            var 응답 = 통합_별점_조회_응답.as(TotalRatingsResponse.class);

            // then
            assertSoftly(softly -> {
                상태_코드를_검증한다(통합_별점_조회_응답, OK);
                assertThat(응답.totalRatings()).isEqualTo(3.5);
                assertThat(응답.totalCount()).isEqualTo(2);
            });
        }
    }
}
