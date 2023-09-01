package com.carffeine.carffeine.station.fixture.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.station.domain.review.Reply;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.infrastructure.repository.review.ReplyResponse;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.carffeine.carffeine.member.fixture.MemberFixture.일반_회원;
import static com.carffeine.carffeine.station.fixture.review.ReviewFixture.리뷰_별4_15글자;

@SuppressWarnings("NonAsciiCharacters")
public class ReplyFixture {
    public static final CreateReplyRequest 답글_요청_1개 = new CreateReplyRequest("저도 그렇게 생각합니다");

    public static final Reply 답글_1개 = Reply.builder()
            .id(1L)
            .review(리뷰_별4_15글자)
            .member(일반_회원)
            .content("저도 그렇게 생각합니다")
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

    public static final Reply 바뀐_답글_1개 = Reply.builder()
            .id(1L)
            .review(리뷰_별4_15글자)
            .member(일반_회원)
            .content("저는 그렇게 생각 안해요")
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .isDeleted(false)
            .build();

    public static final List<Reply> 답글_13개(Review review, Member member) {
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

    public static List<CreateReplyRequest> 답글_요청_13개() {
        List<CreateReplyRequest> createReplyRequests = new ArrayList<>();
        for (int i = 0; i < 13; i++) {
            createReplyRequests.add(답글_요청_1개);
        }
        return createReplyRequests;
    }

    public static final ReplyResponse 응답_답글() {
        return new ReplyResponse(1L, 1L, 1L, LocalDateTime.now(), "덕분에 도움이 되었습니다", false, false);
    }
}
