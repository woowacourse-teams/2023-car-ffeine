package com.carffeine.carffeine.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.review.domain.Reply;
import com.carffeine.carffeine.review.domain.ReplyRepository;
import com.carffeine.carffeine.review.domain.Review;
import com.carffeine.carffeine.review.domain.ReviewRepository;
import com.carffeine.carffeine.station.domain.StationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import static com.carffeine.carffeine.fixture.member.MemberFixture.일반_회원;
import static com.carffeine.carffeine.fixture.review.ReplyFixture.답글_13개;
import static com.carffeine.carffeine.fixture.review.ReplyFixture.저장_전_답글;
import static com.carffeine.carffeine.fixture.review.ReviewFixture.저장_전_리뷰;
import static com.carffeine.carffeine.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
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

    @Autowired
    private StationRepository stationRepository;
    private Member member;
    private Pageable pageable;
    private Review review;

    @BeforeEach
    void setUp() {
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        member = memberRepository.save(일반_회원);
        pageable = PageRequest.of(0, 10, Sort.by("id").descending());
        review = reviewRepository.save(저장_전_리뷰(member));
        for (Reply reply : 답글_13개(review, member)) {
            replyRepository.save(reply);
        }
        replyRepository.save(저장_전_답글(member, review));
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
        Page<Reply> replies = replyRepository.findAllByReview(review, pageable);
        Long replyId = savedReply.getId();
        Reply foundReply = replyRepository.findById(replyId).get();

        // then
        assertSoftly(softly -> {
            softly.assertThat(replies.getTotalElements()).isEqualTo(15);
            softly.assertThat(foundReply).usingRecursiveComparison()
                    .isEqualTo(reply);
        });

    }

    @Test
    void 전체_답글을_조회한다() {
        // when
        Page<Reply> foundReplies = replyRepository.findAllByReview(review, pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(foundReplies.getSize()).isEqualTo(10);
            softly.assertThat(foundReplies.getTotalElements()).isEqualTo(14);
        });
    }

    @Test
    void 리뷰에_등록된_답글의_개수를_구한다() {
        // when
        Long replyCount = replyRepository.countByReview(review);

        // then
        assertThat(replyCount).isEqualTo(14);
    }
}
