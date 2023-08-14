package com.carffeine.carffeine.station.domain.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class FakeReplyRepository implements ReplyRepository {

    private static Long id = 1L;

    private final Map<Long, Reply> map = new HashMap<>();

    @Override
    public Reply save(Reply reply) {
        Reply savedReply = Reply.builder()
                .id(id)
                .review(reply.getReview())
                .member(reply.getMember())
                .content(reply.getContent())
                .isDeleted(reply.isDeleted())
                .build();

        map.put(id++, savedReply);
        return savedReply;
    }

    @Override
    public Optional<Reply> findById(Long replyId) {
        return map.values().stream()
                .filter(it -> it.getId().equals(replyId))
                .findAny();
    }

    @Override
    public Page<Reply> findAllByReview(Review review, Pageable pageable) {
        return new PageImpl<>(map.values().stream()
                .filter(it -> it.getReview().getId().equals(review.getId()))
                .sorted(Comparator.comparing(Reply::getId))
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .toList());
    }

    @Override
    public Long countByReview(Review review) {
        return map.values().stream()
                .filter(it -> it.getReview().getId().equals(review.getId()))
                .count();
    }
}
