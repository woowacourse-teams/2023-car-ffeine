package com.carffeine.carffeine.review.controller;

import com.carffeine.carffeine.auth.controller.support.AuthMember;
import com.carffeine.carffeine.review.infrastructure.dto.ReplyResponses;
import com.carffeine.carffeine.station.service.review.ReplyQueryService;
import com.carffeine.carffeine.station.service.review.ReplyService;
import com.carffeine.carffeine.station.service.review.dto.CreateReplyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.springframework.data.domain.Sort.Direction.DESC;

@RequiredArgsConstructor
@RestController
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyQueryService replyQueryService;

    @PostMapping("/reviews/{reviewId}/replies")
    public ResponseEntity<Void> saveReply(
            @AuthMember Long memberId,
            @PathVariable Long reviewId,
            @Valid @RequestBody CreateReplyRequest createReplyRequest) {
        replyService.saveReply(createReplyRequest, reviewId, memberId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reviews/{reviewId}/replies")
    public ResponseEntity<ReplyResponses> findReplies(
            @PathVariable Long reviewId,
            @PageableDefault(sort = "id", direction = DESC) Pageable pageable) {
        return ResponseEntity.ok(replyQueryService.findAllReplies(reviewId, pageable));
    }

    @PatchMapping("/reviews/{reviewId}/replies/{replyId}")
    public ResponseEntity<Void> updateReply(
            @AuthMember Long memberId,
            @PathVariable Long replyId,
            @RequestBody CreateReplyRequest createReplyRequest) {
        replyService.updateReply(createReplyRequest, replyId, memberId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/reviews/{reviewId}/replies/{replyId}")
    public ResponseEntity<Void> deleteReview(
            @AuthMember Long memberId,
            @PathVariable Long replyId) {
        replyService.deleteReply(memberId, replyId);
        return ResponseEntity.noContent().build();
    }
}
