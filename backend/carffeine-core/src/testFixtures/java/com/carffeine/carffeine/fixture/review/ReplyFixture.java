package com.carffeine.carffeine.fixture.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.review.domain.Reply;
import com.carffeine.carffeine.review.domain.Review;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.fixture.member.MemberFixture.일반_회원;
import static com.carffeine.carffeine.fixture.review.ReviewFixture.리뷰_별4_15글자;

@SuppressWarnings("NonAsciiCharacters")
public class ReplyFixture {

    public static final Reply 답글_1개 = Reply.builder()
            .id(1L)
            .review(리뷰_별4_15글자)
            .member(일반_회원)
            .content("저도 그렇게 생각합니다")
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .isDeleted(false)
            .build();
    public static final Reply 바뀐_답글_1개 = Reply.builder()
            .id(1L)
            .review(리뷰_별4_15글자)
            .member(일반_회원)
            .content("저는 그렇게 생각 안해요")
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .isDeleted(false)
            .build();

    public static Reply 저장_전_답글(Member member, Review review) {
        return Reply.builder()
                .review(review)
                .member(member)
                .content("저도 그렇게 생각합니다")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isDeleted(false)
                .build();
    }

    public static List<Reply> 답글_13개(Review review, Member member) {
        List<Reply> replies = new ArrayList<>();
        for (int i = 0; i < 13; i++) {
            Reply reply = Reply.builder()
                    .review(review)
                    .member(member)
                    .content("도움이 되는 리뷰네요")
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .isDeleted(false)
                    .build();
            replies.add(reply);
        }
        return replies;
    }
}
