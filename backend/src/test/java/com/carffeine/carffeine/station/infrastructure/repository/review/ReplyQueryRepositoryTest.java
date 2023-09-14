package com.carffeine.carffeine.station.infrastructure.repository.review;

import com.carffeine.carffeine.config.QuerydslConfig;
import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.station.domain.review.Reply;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.domain.station.StationRepository;
import com.carffeine.carffeine.station.infrastructure.repository.review.dto.ReplyResponse;
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

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.답글_13개;
import static com.carffeine.carffeine.station.fixture.review.ReplyFixture.저장_전_답글;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.저장_전_리뷰;
import static com.carffeine.carffeine.station.fixture.station.StationFixture.선릉역_충전소_충전기_2개_사용가능_1개;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
@Import(value = {QuerydslConfig.class, ReplyQueryRepository.class})
@DataJpaTest
class ReplyQueryRepositoryTest {

    @Autowired
    private ReplyQueryRepository replyQueryRepository;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StationRepository stationRepository;

    private Member member;
    private Review review;
    private Review otherReview;

    @BeforeEach
    void setUp() {
        member = memberRepository.save(일반_회원);
        stationRepository.save(선릉역_충전소_충전기_2개_사용가능_1개);
        review = reviewRepository.save(저장_전_리뷰(member));
        otherReview = reviewRepository.save(저장_전_리뷰(member));
    }

    @Test
    void 답글을_조회한다() {
        // given
        Reply reply = replyRepository.save(저장_전_답글(member, review));
        PageRequest pageable = PageRequest.of(0, 10);

        // when
        Page<ReplyResponse> allReplies = replyQueryRepository.findAllReplies(review.getId(), pageable);
        ReplyResponse expected = new ReplyResponse(reply.getId(), reply.getReview().getId(), reply.getMember().getId(), reply.getUpdatedAt(), reply.getContent(), reply.getUpdatedAt().isAfter(reply.getCreatedAt()), reply.isDeleted());
        // then
        assertThat(allReplies.getContent().get(0)).usingRecursiveComparison()
                .ignoringFieldsOfTypes(LocalDateTime.class)
                .isEqualTo(expected);
    }

    @Test
    void 답글_13개_중_첫번째_페이지엔_10개의_답글이_있다() {
        // given
        for (Reply reply : 답글_13개(review, member)) {
            replyRepository.save(reply);
        }
        PageRequest pageable = PageRequest.of(0, 10);

        // when
        Page<ReplyResponse> allReplies = replyQueryRepository.findAllReplies(review.getId(), pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(allReplies).hasSize(10);
            softly.assertThat(allReplies.hasNext()).isTrue();
        });
    }

    @Test
    void 답글_13개_중_두번째_페이지엔_3개의_답글이_있다() {
        // given
        for (Reply reply : 답글_13개(review, member)) {
            replyRepository.save(reply);
        }
        PageRequest pageable = PageRequest.of(1, 10);

        // when
        Page<ReplyResponse> allReplies = replyQueryRepository.findAllReplies(review.getId(), pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(allReplies).hasSize(3);
            softly.assertThat(allReplies.hasNext()).isFalse();
        });
    }

    @Test
    void 리뷰가_다르면_답글도_다르다() {
        // given
        for (Reply reply : 답글_13개(review, member)) {
            replyRepository.save(reply);
        }
        PageRequest pageable = PageRequest.of(1, 10);

        // when
        Page<ReplyResponse> allReplies = replyQueryRepository.findAllReplies(otherReview.getId(), pageable);

        // then
        assertSoftly(softly -> {
            softly.assertThat(allReplies).hasSize(0);
            softly.assertThat(allReplies.hasNext()).isFalse();
        });
    }
}
