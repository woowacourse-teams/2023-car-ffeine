package com.carffeine.carffeine.station.integration.review;

import com.carffeine.carffeine.auth.infrastructure.JwtProvider;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.Station;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.service.review.dto.CreateReviewRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.상태_코드를_검증한다;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_요청_1개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.선릉역_충전소_리뷰_별4_15글자;
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

    @Value("${jwt.secret}")
    String secret;
    Station 충전소;
    Member 멤버;
    CreateReviewRequest 요청;
    String 토큰;
    String 잘못된_토큰;
    Review 리뷰;
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
        요청 = 리뷰_요청_1개.get();
        토큰 = jwtProvider.create(멤버.getId());
        잘못된_토큰 = jwtProvider.create(123L);
        리뷰 = reviewRepository.save(선릉역_충전소_리뷰_별4_15글자.get());
    }

    @Nested
    class 충전소에_댓글을_등록할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            // when
            var post응답 = 댓글을_등록한다(요청, 토큰, 충전소);

            // then
            상태_코드를_검증한다(post응답, NO_CONTENT);
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
    class 충전소의_댓글을_수정할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var patch응답 = 댓글을_수정한다(요청, 토큰, 리뷰);

            // then
            상태_코드를_검증한다(patch응답, NO_CONTENT);
        }

        @Test
        void 등록되지_않은_멤버일_경우_예외가_발생한다() {
            //given
            댓글을_등록한다(요청, 토큰, 충전소);

            // when
            var patch응답 = 댓글을_수정한다(요청, 잘못된_토큰, 리뷰);

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

            // then
            상태_코드를_검증한다(delete응답, NO_CONTENT);
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
