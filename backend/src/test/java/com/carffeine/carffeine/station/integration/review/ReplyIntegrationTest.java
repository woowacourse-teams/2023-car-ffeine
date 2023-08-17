package com.carffeine.carffeine.station.integration.review;

import com.carffeine.carffeine.auth.infrastructure.JwtProvider;
import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.controller.review.dto.ReplyResponses;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.값이_같은지_비교한다;
import static com.carffeine.carffeine.helper.integration.AcceptanceTestFixture.상태_코드를_검증한다;
import static com.carffeine.carffeine.member.fixture.MemberFixture.관리자_회원;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.답글_요청_1개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_별4_15글자;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static com.carffeine.carffeine.station.integration.review.ReplyIntegrationTestFixture.답글_ID를_반환한다;
import static com.carffeine.carffeine.station.integration.review.ReplyIntegrationTestFixture.답글을_등록한다;
import static com.carffeine.carffeine.station.integration.review.ReplyIntegrationTestFixture.답글을_삭제한다;
import static com.carffeine.carffeine.station.integration.review.ReplyIntegrationTestFixture.답글을_수정한다;
import static com.carffeine.carffeine.station.integration.review.ReplyIntegrationTestFixture.답글을_조회한다;
import static com.carffeine.carffeine.station.integration.review.ReplyIntegrationTestFixture.답글이_삭제되었는지_검증한다;
import static com.carffeine.carffeine.station.integration.review.ReplyIntegrationTestFixture.답글이_수정되었는지_검증한다;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class ReplyIntegrationTest extends IntegrationTest {

    private Member 멤버;
    private CreateReplyRequest 요청;
    private String 작성자_토큰;
    private String 다른_회원_토큰;
    private String 잘못된_토큰;
    private Review 리뷰;

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private JwtProvider jwtProvider;

    @BeforeEach
    void setUp() {
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        멤버 = memberRepository.save(일반_회원);
        요청 = 답글_요청_1개;
        작성자_토큰 = jwtProvider.create(멤버.getId());
        다른_회원_토큰 = jwtProvider.create(memberRepository.save(관리자_회원).getId());
        잘못된_토큰 = jwtProvider.create(Long.MAX_VALUE);
        리뷰 = reviewRepository.save(리뷰_별4_15글자);
    }

    @Nested
    class 댓글에_답글을_등록할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            // when
            var 등록_응답 = 답글을_등록한다(요청, 작성자_토큰, 리뷰);
            var 응답 = 답글을_조회한다(리뷰).as(ReplyResponses.class);
            var recentReply = 응답.replies().get(0);

            // then
            assertSoftly(softly -> {
                상태_코드를_검증한다(등록_응답, NO_CONTENT);
                값이_같은지_비교한다(recentReply.content(), 요청.content());
            });
        }

        @Test
        void 인증되지_않은_멤버일_경우_예외가_발생한다() {
            // when
            var 등록_응답 = 답글을_등록한다(요청, 잘못된_토큰, 리뷰);

            // then
            상태_코드를_검증한다(등록_응답, NOT_FOUND);
        }
    }

    @Nested
    class 댓글의_답글을_조회할_때 {

        @Test
        void 정상_응답한다() {
            // when
            답글을_등록한다(요청, 작성자_토큰, 리뷰);
            var 조회_응답 = 답글을_조회한다(리뷰);

            // then
            상태_코드를_검증한다(조회_응답, OK);
        }
    }

    @Nested
    class 댓글의_답글을_수정할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            //given
            답글을_등록한다(요청, 작성자_토큰, 리뷰);
            var 조회_응답 = 답글을_조회한다(리뷰);
            var 답글_ID = 답글_ID를_반환한다(조회_응답);

            // when
            String 수정할_답글 = "안녕하세요";
            var 수정_응답 = 답글을_수정한다(수정할_답글, 작성자_토큰, 리뷰.getId(), 답글_ID);

            답글이_수정되었는지_검증한다(답글을_조회한다(리뷰), 수정할_답글);
            상태_코드를_검증한다(수정_응답, NO_CONTENT);
        }

        @Test
        void 등록되지_않은_멤버일_경우_예외가_발생한다() {
            //given
            답글을_등록한다(요청, 작성자_토큰, 리뷰);
            var 조회_응답 = 답글을_조회한다(리뷰);
            var 답글_ID = 답글_ID를_반환한다(조회_응답);

            // when
            var 수정_응답 = 답글을_수정한다("안녕하세요", 다른_회원_토큰, 리뷰.getId(), 답글_ID);

            // then
            상태_코드를_검증한다(수정_응답, UNAUTHORIZED);
        }
    }

    @Nested
    class 댓글의_답글을_삭제할_때 {

        @Test
        void 인증된_멤버일_경우_정상_응답한다() {
            //given
            답글을_등록한다(요청, 작성자_토큰, 리뷰);
            var 조회_응답 = 답글을_조회한다(리뷰);
            var 답글_ID = 답글_ID를_반환한다(조회_응답);

            // when
            var 삭제_응답 = 답글을_삭제한다(작성자_토큰, 리뷰.getId(), 답글_ID);

            // then
            답글이_삭제되었는지_검증한다(답글을_조회한다(리뷰));
            상태_코드를_검증한다(삭제_응답, NO_CONTENT);
        }

        @Test
        void 등록되지_않은_멤버일_경우_예외가_발생한다() {
            //given
            답글을_등록한다(요청, 작성자_토큰, 리뷰);
            var 조회_응답 = 답글을_조회한다(리뷰);
            var 답글_ID = 답글_ID를_반환한다(조회_응답);
            // when
            var 삭제_응답 = 답글을_삭제한다(다른_회원_토큰, 리뷰.getId(), 답글_ID);

            // then
            상태_코드를_검증한다(삭제_응답, UNAUTHORIZED);
        }
    }
}
