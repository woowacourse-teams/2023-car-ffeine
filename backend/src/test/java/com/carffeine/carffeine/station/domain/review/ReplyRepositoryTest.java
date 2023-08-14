package com.carffeine.carffeine.station.domain.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.답글_13개;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.저장안된_리뷰;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@DataJpaTest
public class ReplyRepositoryTest {

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    private Member member;
    private Review review;

    @BeforeEach
    void setUp() {
        member = memberRepository.save(일반_회원);
        review = reviewRepository.save(저장안된_리뷰(member));
    }

    @Test
    void 답글을_등록한다() {
        // given
        Reply reply = Reply.builder()
                .review(review)
                .member(member)
                .content("저도 그렇게 생각합니다")
                .isDeleted(false)
                .build();
        Reply savedReply = replyRepository.save(reply);

        // when
        Long replyId = savedReply.getId();
        Reply foundReply = replyRepository.findById(replyId).get();

        // then
        assertThat(foundReply).usingRecursiveComparison()
                .isEqualTo(reply);
    }

    @Test
    void 전체_답글을_조회한다() {
        // given
        for (Reply reply : 답글_13개(review, member)) {
            replyRepository.save(reply);
        }
        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<Reply> foundReplies = replyRepository.findAllByReview(review, pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(foundReplies.getSize()).isEqualTo(10);
            softly.assertThat(foundReplies.getTotalElements()).isEqualTo(13);
        });
    }

    @Test
    void 리뷰에_등록된_답글의_개수를_구한다() {
        // given
        for (Reply reply : 답글_13개(review, member)) {
            replyRepository.save(reply);
        }

        // when
        Long replyCount = replyRepository.countByReview(review);

        // then
        assertThat(replyCount).isEqualTo(13);
    }
}
