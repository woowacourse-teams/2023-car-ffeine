package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.member.domain.FakeMemberRepository;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.FakeReplyRepository;
import com.carffeine.carffeine.station.domain.review.FakeReviewRepository;
import com.carffeine.carffeine.station.domain.review.Reply;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원3;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.UNAUTHORIZED_MEMBER;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.답글_요청_13개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.저장_전_리뷰;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class ReplyServiceTest {

    private ReplyService replyService;
    private ReviewRepository reviewRepository;
    private ReplyRepository replyRepository;
    private MemberRepository memberRepository;
    private Member member;
    private Review review;
    private CreateReplyRequest createRequest;
    private CreateReplyRequest createRequest2;
    private CreateReplyRequest updateRequest;

    @BeforeEach
    void setUp() {
        reviewRepository = new FakeReviewRepository();
        replyRepository = new FakeReplyRepository();
        memberRepository = new FakeMemberRepository();
        replyService = new ReplyService(reviewRepository, replyRepository, memberRepository);
        member = memberRepository.save(일반_회원);
        review = reviewRepository.save(저장_전_리뷰(member));
        createRequest = new CreateReplyRequest("좋은 생각인 것 같습니다");
        createRequest2 = new CreateReplyRequest("저는 그렇게 생각 안해요");
        updateRequest = new CreateReplyRequest("다시 생각해보니 아닌 것 같아요");
    }

    @Test
    void 답글을_등록한다() {
        // given
        Reply expected = Reply.builder()
                .review(review)
                .member(member)
                .content(createRequest.content())
                .isDeleted(false)
                .build();

        // when
        Reply reply = replyService.saveReply(createRequest, review.getId(), member.getId());

        // then
        assertThat(reply).usingRecursiveComparison()
                .ignoringFields("id")
                .ignoringFieldsOfTypes(LocalDateTime.class)
                .isEqualTo(expected);
    }

    @Test
    void 전체_답글을_조회한다() {
        // given
        Pageable pageable = Pageable.ofSize(10).withPage(0);
        replyService.saveReply(createRequest, review.getId(), member.getId());
        Reply reply = replyService.saveReply(createRequest2, review.getId(), member.getId());

        // when
        Page<Reply> replies = replyService.findAllReplies(review.getId(), pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(replies.getContent().get(0).getContent()).isEqualTo(reply.getContent());
            softly.assertThat(replies).hasSize(2);
        });
    }

    @Test
    void 답글이_13개일_경우_첫_페이지엔_10개의_답글이_보여진다() {
        // given
        int page = 0;
        Pageable pageable = Pageable.ofSize(10).withPage(page);

        for (CreateReplyRequest request : 답글_요청_13개()) {
            replyService.saveReply(request, review.getId(), member.getId());
        }

        // when
        Page<Reply> replies = replyService.findAllReplies(review.getId(), pageable);

        // then
        SoftAssertions.assertSoftly(softly -> {
            assertThat(replies.getNumber()).isEqualTo(page);
            assertThat(replies.getNumberOfElements()).isEqualTo(10);
        });
    }

    @Test
    void 답글이_13개일_경우_두번째_페이지엔_3개의_답글이_보여진다() {
        // given
        Pageable pageable = Pageable.ofSize(10).withPage(1);

        for (CreateReplyRequest request : 답글_요청_13개()) {
            replyService.saveReply(request, review.getId(), member.getId());
        }

        // when
        Page<Reply> replies = replyService.findAllReplies(review.getId(), pageable);

        // then
        assertThat(replies.getNumberOfElements()).isEqualTo(3);
    }

    @Test
    void 답글이_13개일_경우_세번째_페이지엔_답글이_없다() {
        // given
        Pageable pageable = Pageable.ofSize(10).withPage(2);

        for (CreateReplyRequest request : 답글_요청_13개()) {
            replyService.saveReply(request, review.getId(), member.getId());
        }

        // when
        Page<Reply> replies = replyService.findAllReplies(review.getId(), pageable);

        // then
        assertThat(replies).hasSize(0);
    }

    @Test
    void 답글을_수정할_수_있다() {
        // given
        Reply reply = replyService.saveReply(createRequest, review.getId(), member.getId());

        // when
        Reply updatedReply = replyService.updateReply(updateRequest, reply.getId(), member.getId());

        // then
        assertThat(updatedReply.getContent()).isEqualTo(updateRequest.content());
    }

    @Test
    void 답글을_삭제할_수_있다() {
        // given
        Reply reply = replyService.saveReply(createRequest, review.getId(), member.getId());

        // when
        replyService.deleteReply(member.getId(), reply.getId());
        Reply foundReply = replyService.findReply(reply.getId());

        // then
        assertThat(foundReply.isDeleted()).isTrue();
    }

    @Test
    void 작성자가_아니면_수정할_수_없다() {
        // given
        Member member1 = memberRepository.save(일반_회원3);
        Reply reply = replyService.saveReply(createRequest, review.getId(), member.getId());

        // when
        CreateReplyRequest updateRequest = new CreateReplyRequest("정말 그런가요? 저는 아닌데");

        // then
        assertThatThrownBy(() -> replyService.updateReply(updateRequest, reply.getId(), member1.getId()))
                .isInstanceOf(ReviewException.class)
                .hasMessage(UNAUTHORIZED_MEMBER.message());
    }

    @Test
    void 작성자가_아니면_삭제할_수_없다() {
        // given
        Member member1 = memberRepository.save(일반_회원3);
        Reply reply = replyService.saveReply(createRequest, review.getId(), member.getId());

        // when & then
        assertThatThrownBy(() -> replyService.deleteReply(member1.getId(), reply.getId()))
                .isInstanceOf(ReviewException.class)
                .hasMessage(UNAUTHORIZED_MEMBER.message());
    }
}
