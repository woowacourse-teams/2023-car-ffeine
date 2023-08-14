package com.carffeine.carffeine.station.service.review;

import com.carffeine.carffeine.member.domain.Member;
import com.carffeine.carffeine.member.domain.MemberRepository;
import com.carffeine.carffeine.member.exception.MemberException;
import com.carffeine.carffeine.station.domain.review.Reply;
import com.carffeine.carffeine.station.domain.review.ReplyRepository;
import com.carffeine.carffeine.station.domain.review.Review;
import com.carffeine.carffeine.station.domain.review.ReviewRepository;
import com.carffeine.carffeine.station.exception.review.ReviewException;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.carffeine.carffeine.member.exception.MemberExceptionType.NOT_FOUND;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.DELETED_REVIEW;
import static com.carffeine.carffeine.station.exception.review.ReviewExceptionType.REVIEW_NOT_FOUND;

@RequiredArgsConstructor
@Transactional
@Service
public class ReplyService {

    private final ReviewRepository reviewRepository;
    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;

    public Reply saveReply(CreateReplyRequest request, Long reviewId, Long memberId) {
        Review review = findReview(reviewId);
        Member member = findMember(memberId);
        Reply reply = getReply(request, review, member);
        return replyRepository.save(reply);
    }

    @Transactional(readOnly = true)
    public Review findReview(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewException(REVIEW_NOT_FOUND));
    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(NOT_FOUND));
    }

    private Reply getReply(CreateReplyRequest request, Review review, Member member) {
        return Reply.builder()
                .review(review)
                .member(member)
                .content(request.content())
                .build();
    }

    @Transactional(readOnly = true)
    public Page<Reply> findAllReplies(Long reviewId, Pageable pageable) {
        Review review = findReview(reviewId);
        return replyRepository.findAllByReview(review, pageable);
    }

    public Reply updateReply(CreateReplyRequest request, Long replyId, Long memberId) {
        Reply reply = findReply(replyId);
        Member member = findMember(memberId);
        reply.validate(member);
        reply.updateContent(request.content());
        return reply;
    }

    public Reply deleteReply(Long memberId, Long replyId) {
        Reply reply = findReply(replyId);
        Member member = findMember(memberId);
        reply.validate(member);
        reply.delete();
        return reply;
    }

    private Reply findReply(Long replyId) {
        return replyRepository.findById(replyId)
                .orElseThrow(() -> new ReviewException(DELETED_REVIEW));
    }
}
