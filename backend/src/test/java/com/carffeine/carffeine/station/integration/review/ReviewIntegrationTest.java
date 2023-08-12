package com.carffeine.carffeine.station.integration.review;

import com.carffeine.carffeine.auth.infrastructure.JwtProvider;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.member.exception.MemberExceptionType;
import com.carffeine.carffeine.station.controller.review.dto.ReviewResponse;
import com.carffeine.carffeine.station.controller.review.dto.ReviewResponses;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.true_인지_확인한다;
import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.값이_같은지_비교한다;
import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.상태_코드를_검증한다;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_별4_15글자;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_요청_1개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.수정_요청_1개;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.station.integration.review.ReviewIntegrationTestFixture.댓글을_등록한다;
import static com.carffeine.carffeine.station.integration.review.ReviewIntegrationTestFixture.댓글을_삭제한다;
import static com.carffeine.carffeine.station.integration.review.ReviewIntegrationTestFixture.댓글을_수정한다;
import static com.carffeine.carffeine.station.integration.review.ReviewIntegrationTestFixture.댓글을_조회한다;
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
        요청 = 리뷰_요청_1개;
        토큰 = jwtProvider.create(멤버.getId());
        잘못된_토큰 = jwtProvider.create(123L);
        리뷰 = reviewRepository.save(리뷰_별4_15글자);
    }

    private ReviewResponse 해당_댓글을_가져온다() {
        var get응답 = 댓글을_조회한다(충전소);
        var 응답 = get응답.as(ReviewResponses.class);
        return 응답.reviews().stream()
                .filter(it -> Objects.equals(it.reviewId(), 멤버.getId()))
                .findAny()
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_FOUND));
    }

    @Nested
    class 충전소의_리뷰를_조회할_때 {

        @Test
        void 정상_응답한다() {
            // when
            댓글을_등록한다(요청, 토큰, 충전소);
            var get응답 = 댓글을_조회한다(충전소);

            // then
            상태_코드를_검증한다(get응답, OK);
        }
    }

    @Nested
    class 충전소에_댓글을_등록할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            // when
            var post응답 = 댓글을_등록한다(요청, 토큰, 충전소);
            var 응답 = 댓글을_조회한다(충전소).as(ReviewResponses.class);
            var 최근_댓글 = 응답.reviews().get(0);

            // then
            SoftAssertions.assertSoftly(softly -> {
                상태_코드를_검증한다(post응답, NO_CONTENT);
                값이_같은지_비교한다(최근_댓글.ratings(), 요청.ratings());
                값이_같은지_비교한다(최근_댓글.content(), 요청.content());
            });
        }

        @Test
        void 인증되지_않은_멤버일_경우_예외가_발생한다() {
            // when
            var post응답 = 댓글을_등록한다(요청, 잘못된_토큰, 충전소);

            // then
            상태_코드를_검증한다(post응답, NOT_FOUND);
        }
    }

    @Nested
    class 충전소의_댓글을_수정할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var patch응답 = 댓글을_수정한다(수정_요청_1개, 토큰, 리뷰);
            var 해당_댓글 = 해당_댓글을_가져온다();
            // then
            SoftAssertions.assertSoftly(softly -> {
                상태_코드를_검증한다(patch응답, NO_CONTENT);
                값이_같은지_비교한다(해당_댓글.ratings(), 수정_요청_1개.ratings());
                값이_같은지_비교한다(해당_댓글.content(), 수정_요청_1개.content());
            });
        }

        @Test
        void 등록되지_않은_멤버일_경우_예외가_발생한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var patch응답 = 댓글을_수정한다(수정_요청_1개, 잘못된_토큰, 리뷰);

            // then
            상태_코드를_검증한다(patch응답, NOT_FOUND);
        }
    }

    @Nested
    class 충전소의_댓글을_삭제할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var delete응답 = 댓글을_삭제한다(토큰, 리뷰);
            var 해당_댓글 = 해당_댓글을_가져온다();

            // then
            SoftAssertions.assertSoftly(softly -> {
                상태_코드를_검증한다(delete응답, NO_CONTENT);
                true_인지_확인한다(해당_댓글.isDeleted());
            });
        }

        @Test
        void 등록되지_않은_멤버일_경우_예외가_발생한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var delete응답 = 댓글을_삭제한다(잘못된_토큰, 리뷰);

            // then
            상태_코드를_검증한다(delete응답, NOT_FOUND);
        }
    }
}
