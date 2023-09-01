package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.helper.integration.IntegrationTest;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReplyQueryRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReplyResponse;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReplyResponses;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.답글_요청_13개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.저장_전_리뷰;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ReplyQueryServiceTest extends IntegrationTest {

    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ReplyQueryRepository replyQueryRepository;
    private ReplyService replyService;
    private ReplyQueryService replyQueryService;
    private Member member;
    private Review review;
    private CreateReplyRequest createReplyRequest;

    @BeforeEach
    void before() {
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        member = memberRepository.save(일반_회원);
        review = reviewRepository.save(저장_전_리뷰(member));
        createReplyRequest = new CreateReplyRequest("도움이 많이 되는 리뷰네요");
        replyService = new ReplyService(reviewRepository, replyRepository, memberRepository);
        replyQueryService = new ReplyQueryService(replyQueryRepository);
    }

    @Test
    void 리뷰의_답글들을_조회한다(){
        // given
        replyService.saveReply(createReplyRequest, review.getId(),member.getId());
        PageRequest pageable = PageRequest.of(0, 10);

        // when
        ReplyResponses allReplies = replyQueryService.findAllReplies(review.getId(), pageable);
        ReplyResponse expected = new ReplyResponse(null, review.getId(), member.getId(), null, "도움이 많이 되는 리뷰네요", false, false);

        assertSoftly(softly -> {
                softly.assertThat(allReplies.replies()).hasSize(1);
                softly.assertThat(allReplies.replies().get(0)).usingRecursiveComparison()
                        .ignoringFields("replyId")
                        .ignoringFieldsOfTypes(LocalDateTime.class)
                        .isEqualTo(expected);
        });
    }

    @Test
    void 리뷰의_13개_답글들_중_첫번째_페이지를_조회한다(){
        // given
        for (CreateReplyRequest replyRequest : 답글_요청_13개()) {
            replyService.saveReply(replyRequest, review.getId(), member.getId());
        }
        PageRequest pageable = PageRequest.of(0, 10);

        // when
        ReplyResponses allReplies = replyQueryService.findAllReplies(review.getId(), pageable);
        ReplyResponse expected = new ReplyResponse(null, review.getId(), member.getId(), null, "저도 그렇게 생각합니다", false, false);

        assertSoftly(softly -> {
            softly.assertThat(allReplies.replies()).hasSize(10);
            softly.assertThat(allReplies.nextPage()).isEqualTo(1);
            softly.assertThat(allReplies.replies().get(0)).usingRecursiveComparison()
                    .ignoringFields("replyId")
                    .ignoringFieldsOfTypes(LocalDateTime.class)
                    .isEqualTo(expected);
        });
    }

    @Test
    void 리뷰의_13개_답글들_중_마지막_페이지를_조회한다(){
        // given
        for (CreateReplyRequest replyRequest : 답글_요청_13개()) {
            replyService.saveReply(replyRequest, review.getId(), member.getId());
        }
        PageRequest pageable = PageRequest.of(1, 10);

        // when
        ReplyResponses allReplies = replyQueryService.findAllReplies(review.getId(), pageable);
        ReplyResponse expected = new ReplyResponse(null, review.getId(), member.getId(), null, "저도 그렇게 생각합니다", false, false);

        assertSoftly(softly -> {
            softly.assertThat(allReplies.replies()).hasSize(3);
            softly.assertThat(allReplies.nextPage()).isEqualTo(-1);
            softly.assertThat(allReplies.replies().get(0)).usingRecursiveComparison()
                    .ignoringFields("replyId")
                    .ignoringFieldsOfTypes(LocalDateTime.class)
                    .isEqualTo(expected);
        });
    }
}
