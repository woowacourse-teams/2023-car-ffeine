package com.carffeine.carffeine.review.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface ReplyRepository extends Repository<Reply, Long> {

    Reply save(Reply reply);

    Optional<Reply> findById(Long replyId);

    Page<Reply> findAllByReview(Review review, Pageable pageable);

    void delete(Reply reply);

    Long countByReview(Review review);
}
